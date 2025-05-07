import { 
  type LoaderFunctionArgs, 
  Link, 
  redirect, 
  useFetcher 
} from 'react-router'
import { createSupaServerClient } from '~/lib/supabase/supa_client.server'

export async function loader({ request }: LoaderFunctionArgs) {
  // Create a supabase client with the request object
  const { supabase, headers } = createSupaServerClient({ request})

  const { data, error } = await supabase.auth.getUser()
  
  if (error || !data?.user) {
    return redirect('/login')
  }

  return data
}



export default function Protected() {



  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl">Protected</h1>
          <p>This is a protected route</p>
        </div>
      </div>
    </div>
  )
}