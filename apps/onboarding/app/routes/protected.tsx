import {
  Form,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router'
import { requireAuth } from '~/services/clerk_auth.server'
import type { Route } from './+types/protected'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"

export async function loader(args: LoaderFunctionArgs) {
  // require auth will throw redirect to login page 
  // if the user is not authenticated
  const auth_info = await requireAuth(args)

  return { auth_info }
}

export async function action(args: ActionFunctionArgs) {
  const auth_info = await requireAuth(args)
  const formdata = Object.fromEntries(await args.request.formData());

  return { formdata }
}


export default function Protected({ loaderData }: Route.ComponentProps) {
  const { auth_info } = loaderData

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <CollapsibleAuthInfo auth_info={auth_info} />
        <ExampleForm />
      </div>
    </div>
  )
}



function ExampleForm() {
  return (
    <Card className="mt-6 p-4">
      <CardHeader className="text-lg font-semibold">
        Protected Form Content
      </CardHeader>
      <CardContent className="text-sm">
        <Form method="post" className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="exampleInput" className="text-sm font-medium">
              Example Input
            </label>
            <input
              type="text"
              id="exampleInput"
              name="exampleInput"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter something..."
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-4 py-2"
            >
              Submit
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

function CollapsibleAuthInfo({ auth_info }: { auth_info: any }) {
  return (
    <Card className="mb-6">
      <CardHeader className="text-lg font-semibold">
        Authentication Information
      </CardHeader>
      <CardContent className="text-sm">
        <Collapsible>
          <CollapsibleTrigger className="text-lg font-semibold">
            Reveal
          </CollapsibleTrigger>
          <CollapsibleContent>
            <pre className="text-sm">
              {JSON.stringify(auth_info, null, 2)}
            </pre>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}