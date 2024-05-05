import * as React from "react"
// import styles from "./ReactChakraUi.module.scss"

import { Button } from "../../../utilties/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../utilties/components/ui/card"
import { Input } from "../../../utilties/components/ui/input"
import { Label } from "../../../utilties/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../utilties/components/ui/select"

import { IAppProps } from "./IAppProps"

export default function App({ userDisplayName }: IAppProps) {
  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' placeholder='Name of your project' />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='framework'>Framework</Label>
                <Select>
                  <SelectTrigger id='framework'>
                    <SelectValue placeholder='Select' />
                  </SelectTrigger>
                  <SelectContent position='popper'>
                    <SelectItem value='next'>Next.js</SelectItem>
                    <SelectItem value='sveltekit'>SvelteKit</SelectItem>
                    <SelectItem value='astro'>Astro</SelectItem>
                    <SelectItem value='nuxt'>Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
