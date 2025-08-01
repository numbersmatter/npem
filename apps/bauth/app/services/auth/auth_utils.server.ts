import { redirect } from "react-router";
import { auth } from "~/services/auth/auth.server";
import { db } from "~/services/db/db.server";
import { profiles } from "../db/schema";
import { eq } from "drizzle-orm";

const requireAuth = async ({ request }: { request: Request }) => {
  const session = await auth.api.getSession(request);
  console.log("Protected Route Loader - Session:", session);
  if (!session?.user) {
    const url = new URL(request.url);
    const currentPath = url.pathname;
    const loginUrl = "/login";
    const redirectUrl = `${loginUrl}?redirectUrl=${encodeURIComponent(
      currentPath
    )}`;
    throw redirect(redirectUrl);
  }

  return {
    user: session.user,
  };
};

const requireProfile = async ({ request }: { request: Request }) => {
  const { user } = await requireAuth({ request });

  // const result = await db.select()
  // .from(profiles)
  // .where(eq(profiles.id, user.id));

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  if (!profile) {
    throw redirect("/profile");
  }
};

export { requireAuth, requireProfile };
