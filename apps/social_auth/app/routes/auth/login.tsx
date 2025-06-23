import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type ActionFunctionArgs, redirect, useFetcher } from "react-router";


export default function Login() {


  return (<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Use login with Google
            </CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
}