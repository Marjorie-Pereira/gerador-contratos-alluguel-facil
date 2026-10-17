import SignUpForm from "@/components/SignUpForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Register() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
