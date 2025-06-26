import {
  type LoaderFunctionArgs,
} from 'react-router'
import { requireAuth } from '~/services/clerk_auth.server'
import type { Route } from './+types/protected'

export async function loader(args: LoaderFunctionArgs) {
  // Create a supabase client with the request object
  const auth_info = await requireAuth(args)

  return { auth_info }
}



export default function Protected({ loaderData }: Route.ComponentProps) {



  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl">Protected</h1>
          <p>This is a protected route</p>
          <pre className="text-sm">
            {JSON.stringify(loaderData.auth_info, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}