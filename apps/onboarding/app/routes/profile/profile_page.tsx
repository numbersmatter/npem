import type { Route } from "./+types/profile_page";
import { updateAddress } from "./data.server";
import { AddressFormSection, PersonalInfo } from "./profile_sections";


export async function loader({ }) {
  return {}
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


