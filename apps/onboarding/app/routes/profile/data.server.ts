import { parseWithZod } from "@conform-to/zod/v4";
import { validateAddress } from "./validations";
import { createSupabaseAdmin } from "~/services/supabase_server_client.server";

export async function updateAddress({
  formData,
  user_id,
}: {
  formData: FormData;
  user_id: string;
}) {
  const submission = validateAddress({ formData });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { data, error } = await writeAddressToSupabase({
    address: submission.value,
    user_id,
  });

  if (error) {
    return { success: false, message: "error on write" };
  }

  return { success: true, message: "address written" };
}

async function writeAddressToSupabase({
  address,
  user_id,
}: {
  address: any;
  user_id: string;
}) {
  const supabase = createSupabaseAdmin();

  const supabase_response = await supabase
    .from("addresses")
    .insert([
      {
        ...address,
        user_id,
      },
    ])
    .select();

  return supabase_response;
}
