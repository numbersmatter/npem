import { redirect, type LoaderFunctionArgs } from "react-router";
import { auth } from "~/services/auth/auth.server";


export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession(request);
  if (!session || !session.user) {
    throw redirect("/login");
  }

  // throw redirect("/");
  return {}
}



export default function ProtectedRoute() {
  return (
    <div>
      <h1>Protected Route</h1>
      <p>This route is protected and requires authentication.</p>
    </div>
  );
}