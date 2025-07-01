import { getAuth } from "@clerk/react-router/ssr.server";
import { createClerkClient } from "@clerk/react-router/api.server";

import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  redirect,
} from "react-router";
import { getServerEnv } from "~/env.server";

export const getClerkAuth = async (args: LoaderFunctionArgs) => {
  const clerkAuth = await getAuth(args);

  const { CLERK_SECRET_KEY } = getServerEnv();
  const secretKey = CLERK_SECRET_KEY;

  const SIGN_IN_PATH = "/login";

  if (!clerkAuth.userId) {
    return {
      userId: null,
      email: null,
      SIGN_IN_PATH,
    };
  }

  const user = await createClerkClient({ secretKey }).users.getUser(
    clerkAuth.userId
  );

  //  clerk prefixs userId with "user_"
  const userId = clerkAuth.userId;

  const email = user.primaryEmailAddress?.emailAddress as string;
  const phone = user.primaryPhoneNumber?.phoneNumber as string;
  const lname = user.lastName as string;
  const fname = user.firstName as string;

  return {
    userId,
    email,
    phone,
    lname,
    fname,
    SIGN_IN_PATH,
  };
};

const requireAuth = async (args: LoaderFunctionArgs) => {
  const { SIGN_IN_PATH, userId, email, phone, fname, lname } =
    await getClerkAuth(args);

  if (!userId) {
    throw redirect(SIGN_IN_PATH, 302);
  }

  return {
    userId,
    email,
    phone,
    fname,
    lname,
  };
};

export { requireAuth };
