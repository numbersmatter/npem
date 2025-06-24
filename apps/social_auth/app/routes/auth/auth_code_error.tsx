import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";



export default function ErrorCode() {


  return (<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Authentication Error
            </CardTitle>
            <CardDescription>
              An error occurred while trying to authenticate with Google.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-500">
              An error occurred while trying to authenticate with Google. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
}