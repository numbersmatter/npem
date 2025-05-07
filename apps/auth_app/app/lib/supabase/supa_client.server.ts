import { 
  createServerClient, 
  parseCookieHeader, 
  serializeCookieHeader, 
} from '@supabase/ssr';
import { initEnvVariables } from '~/env.server';


export function createSupaServerClient({
  request,
}:{ 
  request: Request,
}) {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = initEnvVariables()
  const headers = new Headers()

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '') as {
            name: string
            value: string
          }[]
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
          )
        },
      },
    }
  )

  return { supabase, headers }

}
