"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "./auth";

export default async function getUserData() {
  const supabase = await createClient();
  const user = await getUser();
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", user.id);

    if (data) {
      const result = { ...data[0], email: user.email };
      return result;
    }
  }

  return;
}
