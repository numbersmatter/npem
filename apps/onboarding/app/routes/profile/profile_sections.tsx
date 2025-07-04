import { useForm } from "@conform-to/react"
import { US_STATE_ABBREVIATIONS, validateAddress } from "./validations"
import { ChevronsDownIcon, XCircleIcon } from "lucide-react"
import { Form, useActionData } from "react-router"
import { cn } from "~/lib/utils"



const noErrorStyle = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";



const errorStyle = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-red-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 sm:text-sm/6";


const displayStyle = (error: string | undefined) => {
  return error ? errorStyle : noErrorStyle;
};


export function PersonalInfo() {
  return <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
    <div className="px-4 sm:px-0">
      <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Use a permanent address where you can receive mail.
      </p>
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="shrink-0">
            <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">There were 2 errors with your submission</h3>
            <div className="mt-2 text-sm text-red-700">
              <ul role="list" className="list-disc space-y-1 pl-5">
                <li>Your password must be at least 8 characters</li>
                <li>Your password must include at least one pro wrestling finishing move</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
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
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
}



export function AddressFormSection() {
  const lastResult = useActionData();

  const defaultAddress = {
    street: "",
    city: "",
    state: "NC",
    zip: ""
  }

  const [form, fields] = useForm({
    onValidate: validateAddress,
    // shouldRevalidate: "onBlur",
    defaultValue: defaultAddress,
  })

  const streetError = fields.street.errors?.[0];
  const cityError = fields.city.errors?.[0];
  const stateError = fields.state.errors?.[0];
  const zipError = fields.zip.errors?.[0];

  const errorData = lastResult?.error;



  const errorStyle = "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-red-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 sm:text-sm/6";





  return <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
    <div className="px-4 sm:px-0">
      <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Use a permanent address where you can receive mail.
      </p>
      {/* Error Information */}
      {errorData && (
        <DisplayError errorData={errorData} />
      )}
    </div>

    <Form
      className="bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      method="post"
      id={form.id}
      onSubmit={form.onSubmit}
      noValidate
    >
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
              Street address
            </label>
            <div className="mt-2">
              <input
                id={fields.street.id}
                key={fields.street.key}
                name={fields.street.name}
                defaultValue={fields.street.initialValue}
                type="text"
                autoComplete="street-address"
                className={cn(
                  displayStyle(streetError),
                )}
              />
            </div>
            {
              streetError &&
              <p className="mt-2 text-sm text-red-600">
                {streetError}
              </p>
            }
          </div>

          <div className="col-span-full">
            <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
              City
            </label>
            <div className="mt-2">
              <input
                id={fields.city.id}
                name={fields.city.name}
                key={fields.city.key}
                type="text"
                defaultValue={fields.city.initialValue}
                className={cn(
                  displayStyle(cityError),
                )}
              />
            </div>
            {
              fields.city.errors &&
              <p className=" mt-2 text-sm text-red-500">
                {fields.city.errors[0]}
              </p>

            }
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
              State
            </label>
            <div className="mt-2 grid grid-cols-1">

              <select
                id={fields.state.id}
                name={fields.state.name}
                key={fields.state.key}
                defaultValue={fields.state.initialValue}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                {
                  US_STATE_ABBREVIATIONS.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))
                }
              </select>
              <ChevronsDownIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
              ZIP / Postal code
            </label>
            <div className="mt-2">
              <input
                id={fields.zip.id}
                name={fields.zip.name}
                key={fields.zip.key}
                defaultValue={fields.zip.initialValue}
                type="text"
                className={cn(
                  displayStyle(zipError),
                )}
              />
            </div>
            {
              zipError &&
              <p className="mt-2 text-sm text-red-500">
                {zipError}
              </p>
            }
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </Form>
    <pre>
      {JSON.stringify(errorData, null, 2)}
    </pre>
    <pre>
      {JSON.stringify(fields, null, 2)}
    </pre>
  </div>
}

function DisplayError({ errorData }: { errorData?: { [key: string]: string[] } }) {
  if (!errorData || Object.keys(errorData).length === 0) return null;
  // Flatten error messages into a single array
  const errorMessages = Object.entries(errorData).flatMap(([field, messages]) =>
    messages.map((msg) => `${field}: ${msg}`)
  );
  return <div className="rounded-md bg-red-50 p-4">
    <div className="flex">
      <div className="shrink-0">
        <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">There {errorMessages.length === 1 ? 'was' : 'were'} {errorMessages.length} error{errorMessages.length === 1 ? '' : 's'} with your submission</h3>
        <div className="mt-2 text-sm text-red-700">
          <ul role="list" className="list-disc space-y-1 pl-5">
            {errorMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
}
