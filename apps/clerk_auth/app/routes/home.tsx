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
          <ul>
            <li>
              <Link to="/sign-up">
                Sign-up
              </Link>
            </li>
            <li>
              <Link to="/login">
                Sign-in
              </Link>
            </li>
            <li>
              <Link to="/protected">
                Protected Route
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>

  );
}
