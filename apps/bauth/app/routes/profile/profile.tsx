import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { requireAuth } from "~/services/auth/auth_utils.server";
import { useState } from "react";
import type { Route } from './+types/profile';
import { getUserProfileData, saveAddress, saveBasicProfile } from './data.server';
import { useForm } from "@conform-to/react";
import { AddressSchema, BasicProfileSchema, type AddressType, type BasicProfile } from "./schemas";
import { Form } from 'react-router';
import { parseWithZod } from '@conform-to/zod/v4';






export async function loader({ request, }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request });

  // Fetch the user profile data
  return await getUserProfileData({ user });
}



export async function action({ request }: Route.ActionArgs) {

  const { user } = await requireAuth({ request });
  // Handle the form submission for address
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  if (actionType === "saveBasicProfile") {

    return await saveBasicProfile({
      formData,
      user,
    });
  }

  if (actionType === "saveAddress") {
    return await saveAddress({
      formData,
      user,
    });
  }

  // Process the address data as needed
  // await db.insert(addresses).values({
  //   streetAddress: formData.get("street-address") as string,
  //   secondaryAddress: formData.get("secondary-address") as string,
  //   city: formData.get("city") as string,
  //   state: formData.get("region") as string,
  //   zipCode: formData.get("postal-code") as string,
  // });

  // Redirect or return a response as needed
  return { success: false, message: "No valid action provided." };
}




export default function ProfilePage({
  actionData, loaderData
}: Route.ComponentProps
) {
  console.log("ProfilePage loaderData", loaderData);
  return (
    <div className="divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>
        <BasicProfile defaultValue={loaderData.defaultProfileData} />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>
        </div>

        <AddressBlock defaultValue={loaderData.defaultAddressData} />

        {
          actionData && <pre className="text-red-500">
            {JSON.stringify(actionData, null, 2)}
          </pre>
        }
      </div>
    </div>
  )
}


function BasicProfile({ defaultValue }: { defaultValue: BasicProfile }) {
  const [form, fields] = useForm({
    defaultValue,
  })

  const [cellPhone, setCellPhone] = useState(fields.cellPhone.defaultValue || "");

  // Format input as (555) 555-5555
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return "";
    let formatted = "";
    if (match[1]) formatted = `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
  };
  return (
    <Form method="POST"
      className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    >
      <div className="px-4 py-6 sm:p-8">
        <div
          className="grid max-w-2xl grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-6"
        >
          <div className="col-span-3">
            <label htmlFor={fields.firstName.id}
              className="block text-sm/6 font-medium text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                id={fields.firstName.id}
                name={fields.firstName.name}
                key={fields.firstName.key}
                defaultValue={fields.firstName.defaultValue}
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="col-span-3">
            <label htmlFor={fields.lastName.id} className="block text-sm/6 font-medium text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                id={fields.lastName.id}
                name={fields.lastName.name}
                key={fields.lastName.key}
                defaultValue={fields.lastName.defaultValue}
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <p className="mt-1 text-sm/6 text-gray-600">
                {fields.lastName.errors}
              </p>
            </div>
          </div>


          <div className="col-span-2 sm:col-span-4 sm:col-start-1">
            <label htmlFor={fields.cellPhone.id} className="block text-sm/6 font-medium text-gray-900">
              Cell Phone
            </label>
            <div className="mt-2">
              <input
                id={fields.cellPhone.id}
                name={fields.cellPhone.name}
                key={fields.cellPhone.key}
                type="text"
                value={cellPhone}
                onChange={(e) => setCellPhone(formatPhone(e.target.value))}
                maxLength={14}
                placeholder="(555) 555-5555"
                autoComplete="tel-area-code"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          name="actionType"
          value="saveBasicProfile"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </Form>
  )
}


function AddressBlock({ defaultValue }: { defaultValue: AddressType }) {

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: AddressSchema,
      })
    },
    // This is the default value for the address form
    defaultValue,
  });

  return (
    <Form method="POST"
      className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
    >
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label htmlFor={fields.streetAddress.id}
              className="block text-sm/6 font-medium text-gray-900"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                id={fields.streetAddress.id}
                name={fields.streetAddress.name}
                key={fields.streetAddress.key}
                defaultValue={fields.streetAddress.defaultValue}
                autoComplete="street-address"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label htmlFor={fields.secondaryAddress.id} className="block text-sm/6 font-medium text-gray-900">
              Secondary address
            </label>
            <div className="mt-2">
              <input
                id={fields.secondaryAddress.id}
                name={fields.secondaryAddress.name}
                key={fields.secondaryAddress.key}
                defaultValue={fields.secondaryAddress.defaultValue}
                type="text"
                autoComplete="address-line2"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label htmlFor={fields.city.id} className="block text-sm/6 font-medium text-gray-900">
              City
            </label>
            <div className="mt-2">
              <input
                id={fields.city.id}
                name={fields.city.name}
                key={fields.city.key}
                defaultValue={fields.city.defaultValue}
                type="text"
                autoComplete="address-level2"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={fields.state.id} className="block text-sm/6 font-medium text-gray-900">
              State / Province
            </label>
            <div className="mt-2">
              <input
                id={fields.state.id}
                name={fields.state.name}
                key={fields.state.key}
                defaultValue={fields.state.defaultValue}
                type="text"
                autoComplete="address-level1"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={fields.zipCode.id} className="block text-sm/6 font-medium text-gray-900">
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                id={fields.zipCode.id}
                name={fields.zipCode.name}
                key={fields.zipCode.key}
                defaultValue={fields.zipCode.defaultValue}
                type="text"
                autoComplete="postal-code"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          name="actionType"
          value="saveAddress"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </Form>
  )
}
