"use client";
import Image from "next/image";
import { User } from "lucide-react";

import {
  financialDateFields,
  ownerFields,
  propertyFields,
  renterFields,
} from "@/lib/constants/formFields";
import Link from "next/link";
import LoadingOverlay from "../components/LoadingOverlay";
import { SubmitEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/FormSection";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import BRAZIL_STATES from "@/lib/constants/states";
import PatternInputField from "@/components/PatternInputField";
import { propertyTypes } from "@/types/propertyTypes";
import { Separator } from "@/components/ui/separator";
import { civilStateTypes } from "@/types/ownerRenterTypes";
import ToggleGroupField from "@/components/ToggleGroupField";
import { FieldLabel } from "@/components/ui/field";
import { genderTypes } from "@/types/genderTypes";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [ownerDocument, setOwnerDocument] = useState("CPF");
  const [renterDocument, setRenterDocument] = useState("CPF");
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
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
        <FormSection
          subtitle="SEÇÃO 01"
          title="Dados do Imóvel"
          icon="Home"
          className="grid grid-cols-3 gap-5"
        >
          <InputField
            label="endereço (logradouro e número)"
            placeholder="Ex: Rua do Amor Perfeito, 123"
            className="col-span-3"
          />
          <InputField label="Bairro" placeholder="Ex: Capão Novo" />
          <InputField
            label="Cidade"
            inputProps={{ defaultValue: "Capão da Canoa" }}
          />
          <SelectField
            label="Estado"
            placeholder="Selecione"
            selectProps={{
              options: BRAZIL_STATES,
              nativeSelectProps: { name: "estado", defaultValue: "RS" },
            }}
          />
          <PatternInputField
            id={"aas"}
            label="CEP"
            required={true}
            patternProps={{ name: "cep", format: "#####-###" }}
            placeholder={"00000-000"}
          />
          <SelectField
            label="Tipo de imóvel"
            placeholder="Selecione"
            selectProps={{
              options: propertyTypes,
              nativeSelectProps: { name: "tipoImovel" },
            }}
            className="col-span-2"
          />
        </FormSection>

        <FormSection
          title="Dados do Locador (Proprietário)"
          subtitle="seção 02"
          icon={"User"}
        >
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Nome Completo"
              placeholder="Nome completo do Locador"
              className="col-span-2"
            />
            <InputField label="Nacionalidade" placeholder="Ex.: Brasileiro" />
            <SelectField
              label="Gênero"
              selectProps={{ options: genderTypes }}
              placeholder="Selecione"
              tip="Usado para sintaxe correta do documento"
            />

            <InputField label="Profissão" placeholder="Ex.: Advogado" />
            <SelectField
              label="Estado Civil"
              selectProps={{ options: civilStateTypes }}
              placeholder="Selecione"
            />
            <ToggleGroupField
              label="Tipo de Documento"
              labelFor="locadorDocumento"
              options={[
                { label: "CPF", value: "CPF" },
                { label: "RG", value: "RG" },
              ]}
              onChange={setOwnerDocument}
              value={ownerDocument}
            />
            {ownerDocument === "CPF" ? (
              <PatternInputField
                label="CPF"
                patternProps={{
                  name: "locadorDocumento",
                  format: "###.###.###-##",
                }}
                placeholder="000.000.000-00"
                id="locadorDocumento"
              />
            ) : (
              <PatternInputField
                label="RG"
                id="locadorDocumento"
                patternProps={{
                  name: "locadorDocumento",
                  format: "##########",
                }}
                placeholder="0000000000"
              />
            )}
          </div>

          <Separator className="my-5" />
          <p className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1 mb-5">
            endereço residencial
          </p>
          <div className="grid grid-cols-3 gap-5">
            <InputField
              label="Logradouro e número"
              placeholder="Rua, Av., Número"
              className="col-span-3"
            />
            <InputField label="Bairro" placeholder="Ex: Capão Novo" />
            <InputField
              label="Cidade"
              inputProps={{ defaultValue: "Capão da Canoa" }}
            />
            <SelectField
              label="Estado"
              placeholder="Selecione"
              selectProps={{
                options: BRAZIL_STATES,
                nativeSelectProps: { name: "estado", defaultValue: "RS" },
              }}
            />
            <PatternInputField
              id={"aas"}
              label="CEP"
              required={true}
              patternProps={{ name: "cep", format: "#####-###" }}
              placeholder={"00000-000"}
            />
          </div>
        </FormSection>

        <FormSection
          title="Dados do Locatário (Inquilino)"
          subtitle="seção 03"
          icon={"Users"}
        >
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Nome Completo"
              placeholder="Nome completo do Locatário"
              className="col-span-2"
            />
            <InputField label="Nacionalidade" placeholder="Ex.: Brasileiro" />
            <SelectField
              label="Gênero"
              selectProps={{ options: genderTypes }}
              placeholder="Selecione"
              tip="Usado para sintaxe correta do documento"
            />
            <InputField label="Profissão" placeholder="Ex.: Advogado" />
            <SelectField
              label="Estado Civil"
              selectProps={{ options: civilStateTypes }}
              placeholder="Selecione"
            />
            <ToggleGroupField
              label="Tipo de Documento"
              labelFor="locatarioDocumento"
              options={[
                { label: "CPF", value: "CPF" },
                { label: "RG", value: "RG" },
              ]}
              onChange={setRenterDocument}
              value={renterDocument}
            />
            {ownerDocument === "CPF" ? (
              <PatternInputField
                label="CPF"
                patternProps={{
                  name: "locatarioDocumento",
                  format: "###.###.###-##",
                }}
                placeholder="000.000.000-00"
                id="locatarioDocumento"
              />
            ) : (
              <PatternInputField
                label="RG"
                id="locatarioDocumento"
                patternProps={{
                  name: "locatarioDocumento",
                  format: "##########",
                }}
                placeholder="0000000000"
              />
            )}
          </div>

          <Separator className="my-5" />
          <p className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1 mb-5">
            endereço residencial
          </p>
          <div className="grid grid-cols-3 gap-5">
            <InputField
              label="Logradouro e número"
              placeholder="Rua, Av., Número"
              className="col-span-3"
            />
            <InputField label="Bairro" placeholder="Ex: Capão Novo" />
            <InputField
              label="Cidade"
              inputProps={{ defaultValue: "Capão da Canoa" }}
            />
            <SelectField
              label="Estado"
              placeholder="Selecione"
              selectProps={{
                options: BRAZIL_STATES,
                nativeSelectProps: { name: "estado", defaultValue: "RS" },
              }}
            />
            <PatternInputField
              id={"aas"}
              label="CEP"
              required={true}
              patternProps={{ name: "cep", format: "#####-###" }}
              placeholder={"00000-000"}
            />
          </div>
        </FormSection>

        <div className="flex justify-between mb-20">
          <p>
            Campos obrigatórios marcados com{" "}
            <span className="text-amber-800">*</span>
          </p>

          <Button type="submit">gerar contrato</Button>
        </div>
      </main>
      <LoadingOverlay
        isOpen={isLoading}
        message="Gerando documento, aguarde por favor."
      />
    </div>
  );
}
