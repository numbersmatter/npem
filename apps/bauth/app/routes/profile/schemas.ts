import { z } from "zod/v4";

export const BasicProfileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  cellPhone: z.string().length(14),
});

export type BasicProfile = z.output<typeof BasicProfileSchema>;
