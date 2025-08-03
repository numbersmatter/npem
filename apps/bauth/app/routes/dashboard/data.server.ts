import { parseWithZod } from "@conform-to/zod/v4";
import { db } from "~/services/db/db.server";
import { addresses, defaultAddress, profiles } from "~/services/db/schema";
import type { User } from "better-auth";
import { eq } from "drizzle-orm";
import { dataWithSuccess } from "remix-toast";

export const getUserProfileData = async ({ user }: { user: User }) => {
  // const profile = await db.query.profiles.findFirst({
  //   where: eq(profiles.id, user.id),
  // });

  // const address = await db.query.defaultAddress.findFirst({
  //   where: eq(defaultAddress.id, user.id),
  // });

  const fullProfileQuery = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id));

  // const fullProfile = fullProfileQuery[0]

  const profile = fullProfileQuery.length ? fullProfileQuery[0] : null;

  const siteProfile = {
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    email: user.email,
  };

  return { siteProfile };
};
