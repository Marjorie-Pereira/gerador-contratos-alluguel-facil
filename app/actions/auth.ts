"use server";

import { createClient } from "@/lib/supabase/server";
import { loginFormData, signUpFormData } from "@/schemas/signUpFormSchema";
import { redirect } from "next/navigation";

export async function login(payload: loginFormData) {
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

export async function signup(payload: signUpFormData) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        first_name: payload.username.split(" ")[0],
        last_name: payload.username.split(" ")[1],
      },
    },
  });

  if (error) {
    console.error(error);
    return {
      success: false,
      code: error.code,
    };
  }

  return {
    success: true,
  };
}
