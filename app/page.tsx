import Image from "next/image";
import { User, Building } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import BRAZIL_STATES from "@/lib/constants/states";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";
import ImovelDataSection from "./ui/components/FormSection";
import { propertyFields } from "@/lib/constants/formFields";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="bg-sky-950 pt-2 pb-8 text-white border-b-4 border-yellow-600">
        <div className="relative">
          <Image
            src={"/logoo.svg"}
            width={640}
            height={640}
            alt={"Logo Alluguel Fácil"}
            className="w-15 h-auto m-auto"
          />
          <User size={28} className="absolute top-0 right-5" />
        </div>
        <div className="mt-5 px-48">
          <h1 className="font-bold text-3xl mb-2">
            Contrato de Locação de Imóvel
          </h1>
          <p className="text-sm">
            Preencha todos os campos obrigatórios para gerar o contrato
          </p>
        </div>
      </header>
      <main className="pt-10 px-48 ">
        <form action="/" method="post">
        <ImovelDataSection
        subtitle="SEÇÃO 01"
        title="Dados do Imóvel"
        icon="Home" 
        fields={propertyFields}
      />
          
        </form>
      </main>
    </div>
  );
}
