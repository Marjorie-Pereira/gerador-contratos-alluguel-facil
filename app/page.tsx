"use client";
import Image from "next/image";
import { User } from "lucide-react";
import ImovelDataSection from "./ui/components/FormSection";
import {
  financialDateFields,
  ownerFields,
  propertyFields,
  renterFields,
} from "@/lib/constants/formFields";
import Link from "next/link";
import LoadingOverlay from "./ui/components/LoadingOverlay";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 5000);
  }
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="flex bg-sky-950  text-white border-b-4 border-yellow-600">
        <div className="w-48 p-10">
          <Image
            src={"/logoo.svg"}
            width={640}
            height={640}
            alt={"Logo Alluguel Fácil"}
            className="w-auto"
          />
        </div>
        <div className="mt-5 flex-1 pt-10 pb-8">
          <h1 className="font-bold text-3xl mb-2">
            Contrato de Locação de Imóvel
          </h1>
          <p className="text-lg">
            Preencha todos os campos obrigatórios para gerar o contrato
          </p>
        </div>
        <Link href={"/login"}>
          {" "}
          <User size={28} className="mt-6 mr-6" />
        </Link>
      </header>
      <main className="pt-10 px-48 ">
        <form action="/" method="post" onSubmit={handleSubmit}>
          <ImovelDataSection
            subtitle="SEÇÃO 01"
            title="Dados do Imóvel"
            icon="Home"
            fields={propertyFields}
          />

          <ImovelDataSection
            subtitle="SEÇÃO 02"
            title="Dados do Locador (Proprietário)"
            icon="User"
            fields={ownerFields}
          />

          <ImovelDataSection
            subtitle="SEÇÃO 03"
            title="Dados do Locatário (Inquilino)"
            icon="User"
            fields={renterFields}
          />

          <ImovelDataSection
            subtitle="SEÇÃO 04"
            title="Condições Financeiras e Vigência"
            icon="DollarSign"
            fields={financialDateFields}
          />
          <div className="flex justify-between mb-20">
            <p>
              Campos obrigatórios marcados com{" "}
              <span className="text-amber-800">*</span>
            </p>
            <button
              type="submit"
              className="text-white uppercase text-base font-bold bg-blue-950 py-4 px-8 hover:opacity-80 "
            >
              Gerar Contrato
            </button>
          </div>
        </form>
      </main>
      <LoadingOverlay
        isOpen={isLoading}
        message="Gerando documento, aguarde por favor."
      />
    </div>
  );
}
