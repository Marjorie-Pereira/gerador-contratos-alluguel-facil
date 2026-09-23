"use client";
import Image from "next/image";
import { User } from "lucide-react";

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
import { genderTypes } from "@/types/genderTypes";
import NumericInputField from "@/components/NumericInputField";
import {
  paymentDayOptions,
  securityDepositOptions,
} from "@/lib/constants/paymentDayOptions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { formInputs } from "@/types/formInputs";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [ownerDocument, setOwnerDocument] = useState("CPF");
  const [renterDocument, setRenterDocument] = useState("CPF");
  const { handleSubmit, control, reset } = useForm<formInputs>({
    defaultValues: {
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "RS",
      cep: "",
      tipoImovel: "casa",
      locadorNome: "",
      locadorGenero: "masculino",
      locadorDocumento: "",
      locadorNacionalidade: "",
      locadorEstadoCivil: "solteiro",
      locadorProfissao: "",
      locadorUf: "RS",
      locadorEndereco: "",
      locadorBairro: "",
      locadorCidade: "",
      locadorCep: "",
      locatarioNome: "",
      locatarioGenero: "masculino",
      locatarioDocumento: "",
      locatarioNacionalidade: "",
      locatarioEstadoCivil: "solteiro",
      locatarioProfissao: "",
      locatarioUf: "RS",
      locatarioEndereco: "",
      locatarioBairro: "",
      locatarioCidade: "",
      locatarioCep: "",
      valorAluguel: "",
      vencimentoAluguel: "1",
      caucao: "3",
      inicioContrato: "",
      fimContrato: "",
    },
  });
  // function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   setTimeout(() => setIsLoading(false), 5000);
  // }

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    console.log("...");
    console.log(data);
  };
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSection
            subtitle="SEÇÃO 01"
            title="Dados do Imóvel"
            icon="Home"
            className="grid grid-cols-3 gap-5"
          >
            <Controller
              name="logradouro"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  label="endereço (logradouro e número)"
                  placeholder="Ex: Rua do Amor Perfeito, 123"
                  className="col-span-3"
                  id="logradouro"
                  inputProps={{ ...field }}
                />
              )}
            />

            <Controller
              name="bairro"
              defaultValue=""
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  label="bairro"
                  id="bairro"
                  placeholder="Ex.: Capão Novo"
                  inputProps={{ ...field }}
                />
              )}
            />

            <Controller
              name="cidade"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputField
                  label="cidade"
                  id="cidade"
                  inputProps={{ ...field }}
                />
              )}
            />

            <Controller
              name="estado"
              control={control}
              rules={{ required: true }}
              render={({ field: { name, onChange, value } }) => (
                <SelectField
                  label="Estado"
                  id="estado"
                  placeholder="Selecione"
                  selectProps={{
                    options: BRAZIL_STATES,
                    nativeSelectProps: { name, onValueChange: onChange, value },
                  }}
                />
              )}
            />

            <Controller
              name="cep"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <PatternInputField
                  id="imovelCep"
                  label="CEP"
                  patternProps={{ ...field, name: "cep", format: "#####-###" }}
                  placeholder={"00000-000"}
                />
              )}
            />

            <Controller
              name="tipoImovel"
              control={control}
              rules={{ required: true }}
              render={({ field: { name, onChange, value } }) => (
                <SelectField
                  label="Tipo de imóvel"
                  id="tipoImovel"
                  placeholder="Selecione"
                  selectProps={{
                    options: propertyTypes,
                    nativeSelectProps: { name, onValueChange: onChange, value },
                  }}
                  className="col-span-2"
                />
              )}
            />
          </FormSection>

          <FormSection
            title="Dados do Locador (Proprietário)"
            subtitle="seção 02"
            icon={"User"}
          >
            <div className="grid grid-cols-2 gap-5">
              <Controller
                name="locadorNome"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="nome completo"
                    placeholder="Nome completo do Locador"
                    className="col-span-2"
                    id="locadorNome"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locadorNacionalidade"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="nacionalidade"
                    placeholder="Ex.: Brasileiro"
                    id="locadorNacionalidade"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locadorGenero"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <SelectField
                    label="gênero"
                    id="locadorGenero"
                    placeholder="Selecione"
                    selectProps={{
                      options: genderTypes,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                    tip="Usado para sintaxe correta do documento"
                  />
                )}
              />

              <Controller
                name="locadorProfissao"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="profissão"
                    placeholder="Ex.: Advogado"
                    id="locadorProfissao"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locadorEstadoCivil"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <SelectField
                    label="estado civil"
                    id="locadorEstadoCivil"
                    placeholder="Selecione"
                    selectProps={{
                      options: civilStateTypes,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                  />
                )}
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
                <Controller
                  name="locadorDocumento"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <PatternInputField
                      label="CPF"
                      patternProps={{
                        format: "###.###.###-##",
                        ...field,
                      }}
                      placeholder="000.000.000-00"
                      id="locadorDocumento"
                    />
                  )}
                />
              ) : (
                <Controller
                  name="locadorDocumento"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <PatternInputField
                      label="RG"
                      id="locadorDocumento"
                      patternProps={{
                        format: "##########",
                        ...field,
                      }}
                      placeholder="0000000000"
                    />
                  )}
                />
              )}
            </div>

            <Separator className="my-5" />
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1 mb-5">
              endereço residencial
            </p>
            <div className="grid grid-cols-3 gap-5">
              <Controller
                name="locadorCep"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PatternInputField
                    id="locadorCep"
                    label="CEP"
                    patternProps={{ format: "#####-###", ...field }}
                    placeholder={"00000-000"}
                  />
                )}
              />
              <Controller
                name="locadorEndereco"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="logradouro e número"
                    placeholder="Rua, número"
                    id="locadorEndereco"
                    inputProps={{ ...field }}
                    className="col-span-2"
                  />
                )}
              />

              <Controller
                name="locadorBairro"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="bairro"
                    placeholder="Ex.: Capão Novo"
                    id="locadorBairro"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locadorCidade"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="cidade"
                    placeholder="Cidade "
                    id="locadorCidade"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locadorUf"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <SelectField
                    label="estado"
                    id="locadorUf"
                    placeholder="Selecione"
                    selectProps={{
                      options: BRAZIL_STATES,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                  />
                )}
              />
            </div>
          </FormSection>

          <FormSection
            title="Dados do Locatário (Inquilino)"
            subtitle="seção 03"
            icon={"Users"}
          >
            <div className="grid grid-cols-2 gap-5">
              <Controller
                name="locatarioNome"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="nome completo"
                    placeholder="Nome completo do locatário"
                    className="col-span-2"
                    id="locatarioNome"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioNacionalidade"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="nacionalidade"
                    placeholder="Ex.: Brasileiro"
                    id="locatarioNacionalidade"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioGenero"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <SelectField
                    label="gênero"
                    id="locatarioGenero"
                    placeholder="Selecione"
                    selectProps={{
                      options: genderTypes,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                    tip="Usado para sintaxe correta do documento"
                  />
                )}
              />

              <Controller
                name="locatarioProfissao"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="profissão"
                    placeholder="Ex.: Advogado"
                    id="locatarioProfissao"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioEstadoCivil"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <SelectField
                    label="estado civil"
                    id="locatarioEstadoCivil"
                    placeholder="Selecione"
                    selectProps={{
                      options: civilStateTypes,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                  />
                )}
              />

              <ToggleGroupField
                label="Tipo de Documento"
                labelFor="locatarioDocumento"
                options={[
                  { label: "CPF", value: "CPF" },
                  { label: "RG", value: "RG" },
                ]}
                onChange={setOwnerDocument}
                value={ownerDocument}
              />
              {ownerDocument === "CPF" ? (
                <Controller
                  name="locatarioDocumento"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <PatternInputField
                      label="CPF"
                      patternProps={{
                        format: "###.###.###-##",
                        ...field,
                      }}
                      placeholder="000.000.000-00"
                      id="locatarioDocumento"
                    />
                  )}
                />
              ) : (
                <Controller
                  name="locatarioDocumento"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <PatternInputField
                      label="RG"
                      id="locatarioDocumento"
                      patternProps={{
                        format: "##########",
                        ...field,
                      }}
                      placeholder="0000000000"
                    />
                  )}
                />
              )}
            </div>

            <Separator className="my-5" />
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1 mb-5">
              endereço residencial
            </p>
            <div className="grid grid-cols-3 gap-5">
              <Controller
                name="locatarioCep"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PatternInputField
                    id="locatarioCep"
                    label="CEP"
                    patternProps={{ format: "#####-###", ...field }}
                    placeholder={"00000-000"}
                  />
                )}
              />
              <Controller
                name="locatarioEndereco"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="logradouro e número"
                    placeholder="Rua, número"
                    id="locatarioEndereco"
                    inputProps={{ ...field }}
                    className="col-span-2"
                  />
                )}
              />

              <Controller
                name="locatarioBairro"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="bairro"
                    placeholder="Ex.: Capão Novo"
                    id="locatarioBairro"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioCidade"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="cidade"
                    placeholder="Cidade "
                    id="locatarioCidade"
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioUf"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <SelectField
                    label="estado"
                    id="locatarioUf"
                    placeholder="Selecione"
                    selectProps={{
                      options: BRAZIL_STATES,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                  />
                )}
              />
            </div>
          </FormSection>

          <FormSection
            title="Condições Financeiras e Vigência"
            subtitle="SEÇÃO 04"
            icon="DollarSign"
          >
            <div className="grid grid-cols-3 gap-5">
              <Controller
                name="valorAluguel"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <NumericInputField
                    label="Valor mensal do aluguel (R$)"
                    id={"valorAluguel"}
                    numericProps={{
                      thousandSeparator: ".",
                      decimalSeparator: ",",
                      prefix: "R$",
                      decimalScale: 2,
                      fixedDecimalScale: true,
                      allowNegative: false,
                      placeholder: "R$1.000,00",
                      ...field,
                    }}
                  />
                )}
              />

              <Controller
                name="vencimentoAluguel"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <SelectField
                    label="dia de vencimento"
                    id="vencimentoAluguel"
                    placeholder="Selecione"
                    selectProps={{
                      options: paymentDayOptions,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="caucao"
                control={control}
                rules={{ required: true }}
                render={({ field: { name, onChange, value } }) => (
                  <SelectField
                    label="Caução"
                    id="caucao"
                    placeholder="Selecione"
                    selectProps={{
                      options: securityDepositOptions,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                  />
                )}
              />
            </div>
            <Separator className="my-5" />
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wide m-0 gap-1 mb-5">
              vigência do contrato
            </p>
            <div className="grid grid-cols-2 gap-5">
              <Controller
                name="inicioContrato"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="início do contrato"
                    id="inicioContrato"
                    inputProps={{ type: "date", ...field }}
                  />
                )}
              />

              <Controller
                name="fimContrato"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    label="término do contrato"
                    id="fimContrato"
                    inputProps={{ type: "date", ...field }}
                  />
                )}
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
        </form>
      </main>
      <LoadingOverlay
        isOpen={isLoading}
        message="Gerando documento, aguarde por favor."
      />
    </div>
  );
}
