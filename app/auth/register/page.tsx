import SignUpForm from "@/components/SignUpForm";
import { createClient } from "@/lib/supabase/server";

export default async function Register() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("user", user);
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
