"use server";
import { adminData } from "@/lib/constants/mockContractData";
import { createClient } from "@/lib/supabase/server";

export default async function getAdminData(role: string) {
  const supabase = await createClient();
  if (role != "admin") return adminData;
  const { data } = await supabase.from("contract_admins").select("*");
  const contractAdminData = data?.at(0) || adminData;
  return contractAdminData;
}
