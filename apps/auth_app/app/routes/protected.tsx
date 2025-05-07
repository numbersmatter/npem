import { 
  type LoaderFunctionArgs, 
  Link, 
  redirect, 
  useFetcher 
} from 'react-router'
import { getServerEnv } from '~/env.server'
import { createSupaServerClient } from '~/lib/supabase/server'

export async function loader({ request }: LoaderFunctionArgs) {
  // Create a supabase client with the request object

  const  {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  } = getServerEnv()

  const { supabase, headers } = createSupaServerClient({
    supa_url: SUPABASE_URL,
    supa_key: SUPABASE_ANON_KEY,
    request
  })

  

  return
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