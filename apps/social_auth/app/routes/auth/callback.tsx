import { redirect, type LoaderFunctionArgs } from "react-router";
import { createSupaServerClient } from "~/lib/supabase_server_client.server";


export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';
  const headers = new Headers();

  const { supabase } = createSupaServerClient({ request });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return redirect(next, { headers });
    }
  }

  // return the user to an error page with instructions
  return redirect('/auth/auth-code-error', { headers });
}