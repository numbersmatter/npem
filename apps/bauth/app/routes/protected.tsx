import type { LoaderFunctionArgs } from "react-router";


export async function loader({ request }: LoaderFunctionArgs) {
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