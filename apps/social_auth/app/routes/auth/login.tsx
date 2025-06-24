import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  type ActionFunctionArgs,
  Form,
  redirect,

} from "react-router";
import { Button } from "~/components/ui/button";

import { createSupaServerClient } from "~/lib/supabase_server_client.server";

export async function action({ request }: ActionFunctionArgs) {

  const { supabase } = createSupaServerClient({ request })
  const url = new URL(request.url)
  const origin = url.origin

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (data.url) {
    return redirect(data.url);
  }

}


export default function Login() {


  return (<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Use login with Google
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post">
              <Button>
                Login with Google
              </Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
}