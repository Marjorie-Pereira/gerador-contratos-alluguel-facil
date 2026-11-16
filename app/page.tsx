import FormPageHeader from "@/components/FormPageHeader";
import RentalForm from "@/components/RentalForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-100">
      <FormPageHeader />
      <main className="pt-10 px-48 ">
        <RentalForm />
      </main>
    </div>
  );
}
