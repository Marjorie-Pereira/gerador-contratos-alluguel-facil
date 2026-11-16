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
    return {
      success: false,
      code: error.code,
    };
  }

  return {
    success: true,
  };
}

export async function getUserRole() {
  const supabase = await createClient();
  let userRole;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user?.id)
      .limit(1);

    userRole = data?.at(0)?.role;
  }

  if (error) {
    console.error(error);
    return "demo";
  }

  return userRole;
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  } else redirect("/login");
}
