import { requireAuth } from "~/services/clerk_auth.server";
import type { Route } from "./+types/profile_page";
import { updateAddress } from "./data.server";
import { AddressFormSection, PersonalInfo } from "./profile_sections";
import { create } from "domain";
import { createSupaServerClient } from "~/services/supabase_server_client.server";


export async function loader(args: Route.LoaderArgs) {
  const { userId } = await requireAuth(args);

  const { supabase } = createSupaServerClient({
    request: args.request,
  });


  return {}
}

export async function clientLoader({
  serverLoader,
  params,
}: Route.ClientLoaderArgs) {

  const serverData = await serverLoader();


  return {};
}


export async function action(args: Route.ActionArgs) {

  const formData = await args.request.formData();

  return updateAddress({ formData })
}



export default function ProfilePage() {
  return (
    <main className="container max-w-7xl mx-auto sm:px-6">
      <div className="divide-y divide-gray-900/10">
        <PersonalInfo />
        <AddressFormSection />
      </div>
    </main>
  );
}


