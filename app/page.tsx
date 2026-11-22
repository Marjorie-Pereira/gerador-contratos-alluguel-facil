import FormPageHeader from "@/components/FormPageHeader";
import RentalForm from "@/components/RentalForm";
import getUserData from "./actions/getUserData";
import { logout } from "./actions/auth";

export default async function Home() {
  let userData;

  try {
    userData = await getUserData();
  } catch (error) {
    await logout();
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <FormPageHeader userData={userData} />
      <main className="pt-10 px-48 ">
        <RentalForm />
      </main>
    </div>
  );
}
