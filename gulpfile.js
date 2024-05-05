"use strict"

const build = require("@microsoft/sp-build-web")
const path = require("path")

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
)

var getTasks = build.rig.getTasks
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig)

  result.set("serve", result.get("serve-deprecated"))

  return result
}

// TailwindCSS
const postcss = require("gulp-postcss")
const atimport = require("postcss-import")
const tailwind = require("tailwindcss")

const tailwindcss = build.subTask(
  "tailwindcss",
  function (gulp, buildOptions, done) {
    gulp
      .src("assets/tailwind.css")
      .pipe(postcss([atimport(), tailwind("./tailwind.config.js")]))
      .pipe(gulp.dest("assets/dist"))
    done()
  }
)
build.rig.addPreBuildTask(tailwindcss)

// wnd TailwindCSS

build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    if (!generatedConfiguration.resolve.alias) {
      generatedConfiguration.resolve.alias = {}
    }

    // webparts folder
    generatedConfiguration.resolve.alias["@webparts"] = path.resolve(
      __dirname,
      "lib/webparts"
    )

    // components folder
    generatedConfiguration.resolve.alias["@utilties"] = path.resolve(
      __dirname,
      "lib/utilties"
    )

    //root src folder
    generatedConfiguration.resolve.alias["src"] = path.resolve(__dirname, "lib")

    return generatedConfiguration
  },
})

// build.configureWebpack.mergeConfig({
//   additionalConfiguration: (generatedConfiguration) => {
//     generatedConfiguration.module.rules.push(
//       {
//         test: /\.mjs$/,
//         include: /node_modules/,
//         type: "javascript/auto",
//       },
//       {
//         // Match `.js`, `.jsx`, `.ts` or `.tsx` files
//         test: /\.[jt]sx?$/,
//         loader: "esbuild-loader",
//         options: {
//           // JavaScript version to compile to
//           target: "es2015",
//         },
//       }
//     )

//     generatedConfiguration.resolve.extensions = ["*", ".mjs", ".js", ".json"]

//     return generatedConfiguration
//   },
// })

build.initialize(require("gulp"))
