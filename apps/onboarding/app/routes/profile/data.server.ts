import { parseWithZod } from "@conform-to/zod/v4";
import { validateAddress } from "./validations";

export function updateAddress({ formData }: { formData: FormData }) {
  const submission = validateAddress({ formData });

  if (submission.status !== "success") {
    return submission.reply();
  }

  return writeAddressToSupabase();
}

function writeAddressToSupabase() {}
