import { router } from "better-auth/api";
import { redirect, useNavigate, type LoaderFunctionArgs } from "react-router";
import { auth } from "~/services/auth/auth.server";
import { authClient } from "~/services/auth/auth_client";
import { requireAuth } from "~/services/auth/auth_utils.server";


export async function loader({ request }: LoaderFunctionArgs) {
  const { user } = await requireAuth({ request })

  // throw redirect("/");
  return {}
}





export default function ProtectedRoute() {
  // const revokeOtherSessions = authClient.revokeOtherSessions();
  // console.log("Revoke Other Sessions:", revokeOtherSessions);

  const client = authClient.useSession();
  const session = client.data?.session;
  const user = client.data?.user
  console.log("Protected Route - Session:", session);
  const navigate = useNavigate();



  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/login");
        }
      }
    });

  };

  return (
    <div>
      <h1>Protected Route</h1>
      <p>This route is protected and requires authentication.</p>
      <button onClick={signOut} className="btn btn-primary">
        Sign Out
      </button>
      <p>User: {user?.email}</p>
      <p>Session ID: {session?.id}</p>
      <p>Expires at: {session?.expiresAt?.toString()}</p>
    </div>
  );
}