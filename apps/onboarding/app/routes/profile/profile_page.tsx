import { requireAuth } from "~/services/clerk_auth.server";
import type { Route } from "./+types/profile_page";
import { updateAddress } from "./data.server";
import { AddressFormSection, PersonalInfo } from "./profile_sections";
import {
  createSupabaseAdmin,
} from "~/services/supabase_server_client.server";


export async function loader(args: Route.LoaderArgs) {
  const { userId } = await requireAuth(args);

  const supabaseAdmin = createSupabaseAdmin();

  const { data: user_profile, error } = await supabaseAdmin
    .from("user_profiles")
    .select(`*, addresses (*)`)
    .eq("id", userId)
    .single();

  if (error) {
    return { userId, error: error.message };
  }

  const address = user_profile.addresses

  const defaultAddress = {
    street_address: address?.street_address || "",
    street_address2: address?.street_address2 || "",
    city: address?.city || "",
    state: address?.state || "",
    zip_code: address?.zip_code || "",
  }

  return { userId, user_profile, defaultAddress }
}




export async function action(args: Route.ActionArgs) {
  const { userId } = await requireAuth(args);
  const formData = await args.request.formData();

  return updateAddress({ formData, user_id: userId })
}



export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  const { userId, user_profile, defaultAddress } = loaderData;
  const address = user_profile?.addresses;
  return (
    <main className="container max-w-7xl mx-auto sm:px-6">
      <div className="divide-y divide-gray-900/10">
        <PersonalInfo />
        <AddressFormSection address={defaultAddress} />
        <pre className="text-gray-500 text-sm mt-4">
          {JSON.stringify(loaderData, null, 2)}
        </pre>
      </div>
    </main>
  );
}


