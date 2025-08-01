import { z } from "zod/v4";

export const BasicProfileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  cellPhone: z.string().length(14),
});

export type BasicProfile = z.output<typeof BasicProfileSchema>;

export const AddressSchema = z.object({
  streetAddress: z.string("Field is required.").min(4, "Address is too short"),
  secondaryAddress: z.string().default(""),
  city: z.string("Field is required.").min(4),
  state: z.string().length(2),
  zipCode: z
    .string()
    .length(5)
    .regex(/^\d{5}$/, "Zip code must be 5 digits"),
});

export type AddressType = z.output<typeof AddressSchema>;
