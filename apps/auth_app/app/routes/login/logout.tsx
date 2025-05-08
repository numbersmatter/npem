import { redirect, type ActionFunctionArgs } from "react-router";
import { createSupaServerClient } from "~/lib/supabase/supa_client.server";




export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createSupaServerClient({request})

  const { error } = await supabase.auth.signOut()
  if (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred",
    }
  }

  return redirect("/login", )
}