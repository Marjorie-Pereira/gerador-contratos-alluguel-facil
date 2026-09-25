"use client";
import Image from "next/image";
import { User } from "lucide-react";

import Link from "next/link";
import LoadingOverlay from "../components/LoadingOverlay";
import { SubmitEvent, use, useEffect, useState } from "react";
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
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";

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
      tipoImovel: "",
      locadorNome: "",
      locadorGenero: "",
      locadorDocumento: "",
      locadorNacionalidade: "",
      locadorEstadoCivil: "",
      locadorProfissao: "",
      locadorUf: "RS",
      locadorEndereco: "",
      locadorBairro: "",
      locadorCidade: "",
      locadorCep: "",
      locatarioNome: "",
      locatarioGenero: "",
      locatarioDocumento: "",
      locatarioNacionalidade: "",
      locatarioEstadoCivil: "",
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

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    console.log("...");
    console.log(data);
    reset();
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
              rules={{ required: "campo obrigatório" }}
              render={({ field, fieldState }) => (
                <InputField
                  invalid={fieldState.invalid}
                  label="endereço (logradouro e número)"
                  placeholder="Ex: Rua do Amor Perfeito, 123"
                  className="col-span-3"
                  id={field.name}
                  inputProps={{ ...field }}
                  errors={[fieldState.error]}
                />
              )}
            />

            <Controller
              name="bairro"
              defaultValue=""
              control={control}
              rules={{ required: "campo obrigatório" }}
              render={({ field, fieldState }) => (
                <InputField
                  invalid={fieldState.invalid}
                  label="bairro"
                  id={field.name}
                  placeholder="Ex.: Capão Novo"
                  inputProps={{ ...field }}
                  errors={[fieldState.error]}
                />
              )}
            />

            <Controller
              name="cidade"
              control={control}
              rules={{ required: "campo obrigatório" }}
              render={({ field, fieldState }) => (
                <InputField
                  invalid={fieldState.invalid}
                  label="cidade"
                  id={field.name}
                  inputProps={{ ...field }}
                  errors={[fieldState.error]}
                />
              )}
            />

            <Controller
              name="estado"
              control={control}
              rules={{ required: true }}
              render={({ field: { name, onChange, value }, fieldState }) => (
                <SelectField
                  label="Estado"
                  id={name}
                  placeholder="Selecione"
                  selectProps={{
                    options: BRAZIL_STATES,
                    nativeSelectProps: { name, onValueChange: onChange, value },
                  }}
                  invalid={fieldState.invalid}
                  errors={[fieldState.error]}
                />
              )}
            />

            <Controller
              name="cep"
              control={control}
              rules={{ required: "campo obrigatório" }}
              render={({ field, fieldState }) => (
                <PatternInputField
                  id={field.name}
                  label="CEP"
                  patternProps={{ ...field, name: "cep", format: "#####-###" }}
                  placeholder={"00000-000"}
                  invalid={fieldState.invalid}
                  errors={[fieldState.error]}
                />
              )}
            />

            <Controller
              name="tipoImovel"
              control={control}
              rules={{ required: "por favor, selecione o tipo de imóvel" }}
              render={({ field: { name, onChange, value }, fieldState }) => (
                <SelectField
                  label="Tipo de imóvel"
                  id={name}
                  placeholder="Selecione"
                  selectProps={{
                    options: propertyTypes,
                    nativeSelectProps: { name, onValueChange: onChange, value },
                  }}
                  className="col-span-2"
                  invalid={fieldState.invalid}
                  errors={[fieldState.error]}
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
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="nome completo"
                    placeholder="Nome completo do Locador"
                    className="col-span-2"
                    id={field.name}
                    invalid={fieldState.invalid}
                    inputProps={{ ...field }}
                    errors={[fieldState.error]}
                  />
                )}
              />

              <Controller
                name="locadorNacionalidade"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="nacionalidade"
                    placeholder="Ex.: Brasileiro"
                    id={field.name}
                    inputProps={{ ...field }}
                    invalid={fieldState.invalid}
                    errors={[fieldState.error]}
                  />
                )}
              />

              <Controller
                name="locadorGenero"
                control={control}
                rules={{ required: "campo orbigatório" }}
                render={({ field: { name, onChange, value }, fieldState }) => (
                  <SelectField
                    label="gênero"
                    id={name}
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
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="locadorProfissao"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="profissão"
                    placeholder="Ex.: Advogado"
                    id={field.name}
                    inputProps={{ ...field }}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="locadorEstadoCivil"
                control={control}
                rules={{ required: "por favor, selecione o estado civil" }}
                render={({ field: { name, onChange, value }, fieldState }) => (
                  <SelectField
                    label="estado civil"
                    id={name}
                    placeholder="Selecione"
                    selectProps={{
                      options: civilStateTypes,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
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
                  rules={{ required: "campo obrigatório" }}
                  render={({ field, fieldState }) => (
                    <PatternInputField
                      label="CPF"
                      patternProps={{
                        format: "###.###.###-##",
                        ...field,
                      }}
                      placeholder="000.000.000-00"
                      id={field.name}
                      errors={[fieldState.error]}
                      invalid={fieldState.invalid}
                    />
                  )}
                />
              ) : (
                <Controller
                  name="locadorDocumento"
                  control={control}
                  rules={{ required: "campo obrigatório" }}
                  render={({ field, fieldState }) => (
                    <PatternInputField
                      label="RG"
                      id={field.name}
                      errors={[fieldState.error]}
                      invalid={fieldState.invalid}
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
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <PatternInputField
                    id={field.name}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                    label="CEP"
                    patternProps={{ format: "#####-###", ...field }}
                    placeholder={"00000-000"}
                  />
                )}
              />
              <Controller
                name="locadorEndereco"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="logradouro e número"
                    placeholder="Rua, número"
                    id={field.name}
                    invalid={fieldState.invalid}
                    errors={[fieldState.error]}
                    inputProps={{ ...field }}
                    className="col-span-2"
                  />
                )}
              />

              <Controller
                name="locadorBairro"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="bairro"
                    placeholder="Ex.: Capão Novo"
                    id={field.name}
                    inputProps={{ ...field }}
                    invalid={fieldState.invalid}
                    errors={[fieldState.error]}
                  />
                )}
              />

              <Controller
                name="locadorCidade"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="cidade"
                    placeholder="Cidade "
                    id={field.name}
                    inputProps={{ ...field }}
                    invalid={fieldState.invalid}
                    errors={[fieldState.error]}
                  />
                )}
              />

              <Controller
                name="locadorUf"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field: { name, onChange, value }, fieldState }) => (
                  <SelectField
                    label="estado"
                    id={name}
                    placeholder="Selecione"
                    selectProps={{
                      options: BRAZIL_STATES,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                    invalid={fieldState.invalid}
                    errors={[fieldState.error]}
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
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="nome completo"
                    placeholder="Nome completo do locatário"
                    className="col-span-2"
                    id={field.name}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioNacionalidade"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="nacionalidade"
                    placeholder="Ex.: Brasileiro"
                    id={field.name}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioGenero"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field: { name, onChange, value }, fieldState }) => (
                  <SelectField
                    label="gênero"
                    id={name}
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
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="locatarioProfissao"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="profissão"
                    placeholder="Ex.: Advogado"
                    id={field.name}
                    inputProps={{ ...field }}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="locatarioEstadoCivil"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field: { name, onChange, value }, fieldState }) => (
                  <SelectField
                    label="estado civil"
                    id={name}
                    placeholder="Selecione"
                    selectProps={{
                      options: civilStateTypes,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
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
                onChange={setRenterDocument}
                value={renterDocument}
              />
              {renterDocument === "CPF" ? (
                <Controller
                  name="locatarioDocumento"
                  control={control}
                  rules={{ required: "campo obrigatório" }}
                  render={({ field, fieldState }) => (
                    <PatternInputField
                      label="CPF"
                      patternProps={{
                        format: "###.###.###-##",
                        ...field,
                      }}
                      placeholder="000.000.000-00"
                      id={field.name}
                      errors={[fieldState.error]}
                      invalid={fieldState.invalid}
                    />
                  )}
                />
              ) : (
                <Controller
                  name="locatarioDocumento"
                  control={control}
                  rules={{ required: "campo obrigatório" }}
                  render={({ field, fieldState }) => (
                    <PatternInputField
                      label="RG"
                      id={field.name}
                      patternProps={{
                        format: "##########",
                        ...field,
                      }}
                      placeholder="0000000000"
                      errors={[fieldState.error]}
                      invalid={fieldState.invalid}
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
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <PatternInputField
                    id={field.name}
                    label="CEP"
                    patternProps={{ format: "#####-###", ...field }}
                    placeholder={"00000-000"}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                  />
                )}
              />
              <Controller
                name="locatarioEndereco"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="logradouro e número"
                    placeholder="Rua, número"
                    id={field.name}
                    inputProps={{ ...field }}
                    className="col-span-2"
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="locatarioBairro"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="bairro"
                    placeholder="Ex.: Capão Novo"
                    id={field.name}
                    invalid={fieldState.invalid}
                    errors={[fieldState.error]}
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioCidade"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="cidade"
                    placeholder="Cidade "
                    id={field.name}
                    invalid={fieldState.invalid}
                    errors={[fieldState.error]}
                    inputProps={{ ...field }}
                  />
                )}
              />

              <Controller
                name="locatarioUf"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field: { name, onChange, value }, fieldState }) => (
                  <SelectField
                    label="estado"
                    id={name}
                    placeholder="Selecione"
                    selectProps={{
                      options: BRAZIL_STATES,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
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
                rules={{ required: "campo obrigatório" }}
                render={({ field, fieldState }) => (
                  <NumericInputField
                    label="Valor mensal do aluguel (R$)"
                    id={field.name}
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
                    invalid={fieldState.invalid}
                    errors={[fieldState.error]}
                  />
                )}
              />

              <Controller
                name="vencimentoAluguel"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field: { name, onChange, value }, fieldState }) => (
                  <SelectField
                    label="dia de vencimento"
                    id={name}
                    placeholder="Selecione"
                    selectProps={{
                      options: paymentDayOptions,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="caucao"
                control={control}
                rules={{ required: "campo obrigatório" }}
                render={({ field: { name, onChange, value }, fieldState }) => (
                  <SelectField
                    label="Caução"
                    id={name}
                    placeholder="Selecione"
                    selectProps={{
                      options: securityDepositOptions,
                      nativeSelectProps: {
                        name,
                        onValueChange: onChange,
                        value,
                      },
                    }}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
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
                rules={{ required: "campo orbigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="início do contrato"
                    id={field.name}
                    inputProps={{ type: "date", ...field }}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
                  />
                )}
              />

              <Controller
                name="fimContrato"
                control={control}
                rules={{ required: "obrigatório" }}
                render={({ field, fieldState }) => (
                  <InputField
                    label="término do contrato"
                    id={field.name}
                    errors={[fieldState.error]}
                    invalid={fieldState.invalid}
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
      {/* <LoadingOverlay
        isOpen={isSubmitting}
        message="Gerando documento, aguarde por favor."
      /> */}
    </div>
  );
}
