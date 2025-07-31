import type { Route } from "./+types/address";


export async function action({ request }: Route.ActionArgs) {
  // Handle the form submission for address
  const formData = await request.formData();
  const address = formData.get("address") as string;

  // Here you would typically save the address to a database or perform some action
  console.log("Address submitted:", address);

  // Redirect or return a response as needed
  return { success: true, message: "Address saved successfully!" };
}

export default function AddressPage({ }: Route.ComponentProps) {


  return <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Address Page
      </h2>

    </div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      {/* <RegisterCard /> */}

      <div>
        <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
          Address
        </label>
        <div className="mt-2">
          <input
            id="address"
            name="address"
            type="text"
            placeholder="123 Main St, Anytown, USA"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div className="mt-6">
        <button className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save Address
        </button>
      </div>
    </div>
  </div>;

}
