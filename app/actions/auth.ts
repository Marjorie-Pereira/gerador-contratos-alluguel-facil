"use server";

import { createClient } from "@/lib/supabase/server";
import { loginFormData } from "@/schemas/signUpFormSchema";
import { redirect } from "next/navigation";

export default async function login(payload: loginFormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    return {
      success: false,
      code: error.code,
    };
  }

  redirect("/");
}
