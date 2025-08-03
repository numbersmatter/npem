import { parseWithZod } from "@conform-to/zod/v4";
import { AddressSchema, BasicProfileSchema, type AddressType } from "./schemas";
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
    .where(eq(profiles.id, user.id))
    .leftJoin(defaultAddress, eq(defaultAddress.id, user.id));

  // const fullProfile = fullProfileQuery[0]

  const profile = fullProfileQuery.length ? fullProfileQuery[0].profiles : null;

  const address = fullProfileQuery.length
    ? fullProfileQuery[0].default_address
    : null;

  const defaultProfileData = {
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    cellPhone: profile?.cellPhone ?? "",
  };

  const defaultAddressData: AddressType = {
    streetAddress: address?.streetAddress ?? "",
    secondaryAddress: address?.secondaryAddress ?? "",
    city: address?.city ?? "",
    zipCode: address?.zipCode ?? "",
    state: address?.state ?? "",
  };

  return { profile, defaultProfileData, defaultAddressData };
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

  const { firstName, lastName, cellPhone } = submission.value;

  await db
    .insert(profiles)
    .values({
      id: user.id,
      firstName,
      lastName,
      cellPhone,
    })
    .onConflictDoUpdate({
      target: profiles.id,
      set: {
        firstName,
        lastName,
        cellPhone,
      },
    });

  return dataWithSuccess(
    { result: "Profile saved successfully" },
    { message: "Profile updated 🎉", description: "description of toast" }
  );
};

export const saveAddress = async ({
  formData,
  user,
}: {
  formData: FormData;
  user: User;
}) => {
  const submission = parseWithZod(formData, {
    schema: AddressSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const a = submission.value;

  await db
    .insert(defaultAddress)
    .values({
      id: user.id,
      streetAddress: a.streetAddress,
      secondaryAddress: a.secondaryAddress,
      city: a.city,
      state: a.state,
      zipCode: a.zipCode,
    })
    .onConflictDoUpdate({
      target: defaultAddress.id,
      set: {
        streetAddress: a.streetAddress,
        secondaryAddress: a.secondaryAddress,
        city: a.city,
        state: a.state,
        zipCode: a.zipCode,
      },
    });

  return dataWithSuccess(
    { result: "Address saved successfully" },
    { message: "Address saved! 🎉", description: "description of toast" }
  );
};
