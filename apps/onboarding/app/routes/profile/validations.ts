import * as z from "zod/v4";
import { parseWithZod } from "@conform-to/zod/v4";

export const US_STATE_ABBREVIATIONS = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
] as const;

const AddressSchema = z.object({
  street_address: z
    .string("Required")
    .min(2, "Must be atleast 2 characters")
    .max(100),
  street_address2: z.string().optional(),
  city: z.string("Required").min(2, "Must be atleast 2 characters").max(100),
  state: z.enum(US_STATE_ABBREVIATIONS),
  zip_code: z.string("Required").length(5, " Must be 5 characters"),
});

export const validateAddress = ({ formData }: { formData: FormData }) => {
  return parseWithZod(formData, { schema: AddressSchema });
};
