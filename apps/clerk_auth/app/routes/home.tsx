import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <div className="max-w-[300px] w-full space-y-6 px-4">
        <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
          <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
            What&apos;s next?
          </p>
          <ul className="space-y-2">
            <li>
              <Link to="/sign-up">
                <Button variant={"link"}>
                  Sign-up
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <Button variant={"link"}>
                  Login
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/protected">
                <Button variant={"link"}>
                  Protected Route
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

  );
}
