import { Button } from "~/components/ui/button";
import { requireAuth } from "~/services/clerk_auth.server";
import type { Route } from "./+types/apply_welcome";

export async function loader(args: Route.LoaderArgs) {
  await requireAuth(args)
  return null;
}

export default function ApplyWelcome() {
  return (
    <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
      <div className="max-w-[340px] w-full space-y-8 px-4 py-8 bg-white/80 dark:bg-emerald-950/80 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">Welcome!</h1>
        <p className="text-gray-700 dark:text-gray-200 text-lg">
          We’re excited to have you join our nonprofit community.<br />
          Let’s get started with a quick onboarding process to help you make the most of your experience.
        </p>
        <Button
          variant="default"
          size="lg"
          className="mt-6 font-semibold shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition"

        >
          Begin Onboarding
        </Button>
      </div>
    </div>
  );
}