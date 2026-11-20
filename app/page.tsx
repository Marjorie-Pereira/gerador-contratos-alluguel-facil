import FormPageHeader from "@/components/FormPageHeader";
import RentalForm from "@/components/RentalForm";
import getUserData from "./actions/getUserData";

export default async function Home() {
  const userData = await getUserData();
  return (
    <div className="min-h-screen bg-stone-100">
      <FormPageHeader userData={userData} />
      <main className="pt-10 px-48 ">
        <RentalForm />
      </main>
    </div>
  );
}
