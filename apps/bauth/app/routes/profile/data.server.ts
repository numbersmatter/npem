import { parseWithZod } from "@conform-to/zod/v4";
import { BasicProfileSchema } from "./schemas";
import { db } from "~/services/db/db.server";
import { profiles } from "~/services/db/schema";
import type { User } from "better-auth";
import { eq } from "drizzle-orm";

export const getUserProfileData = async ({ user }: { user: User }) => {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  const defaultProfileData = {
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    cellPhone: "(123) 456-7890",
  };

  return { profile, defaultProfileData };
};

export const saveBasicProfile = async ({
  formData,
  user,
}: {
  formData: FormData;
  user: User;
}) => {
  const submission = parseWithZod(formData, {
    schema: BasicProfileSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { firstName, lastName } = submission.value;

  await db
    .insert(profiles)
    .values({
      id: user.id,
      firstName,
      lastName,
    })
    .onConflictDoUpdate({
      target: profiles.id,
      set: {
        firstName,
        lastName,
      },
    });

  return submission.reply();
};
