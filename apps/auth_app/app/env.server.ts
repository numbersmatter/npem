import { z } from "zod";

const envSchema = z.object({
 SUPABASE_URL: z.string().url(),
 SUPABASE_ANON_KEY: z.string(),
});

export const initEnvVariables = () => {
  const env = envSchema.safeParse(process.env);
  if (!env.success) {
    console.error(
      "Invalid environment variables",
      env.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }
  return env.data;
};

export const getServerEnv = () => initEnvVariables();

// manunally add client env variables
export const getClientEnv = () => {};


export type CLIENT_ENV = ReturnType<typeof getClientEnv>;
type APP_ENV = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends APP_ENV {}
  }
}
