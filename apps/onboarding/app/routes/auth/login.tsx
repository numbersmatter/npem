import { SignIn } from "@clerk/react-router"
import plantHydrating from "~/images/plant hydrating.jpeg"


export default function Login() {

  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col place-content-center">
        <div className="mx-auto">
          <img
            src={plantHydrating}
            alt="logo"
            className="h-36 object-contain"
          />
        </div>

        <main className="flex flex-1 flex-col content-center items-center  gap-4 p-4 lg:gap-6 lg:p-6">
          <SignIn
            appearance={{
              elements: {
                "cl-logoBox": "h-34"
              }
            }

            }
          />

        </main>
      </div>
    </div>
  )
}