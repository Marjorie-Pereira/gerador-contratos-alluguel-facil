import { FormFieldProps } from "@/types/formTypes";
import BRAZIL_STATES from "./states";
import { propertyTypes } from "@/types/propertyTypes";
import { genderTypes } from "@/types/genderTypes";
import { civilStateTypes } from "@/types/ownerRenterTypes";
import { paymentDayOptions, securityDepositOptions } from "./paymentDayOptions";

export const propertyFields: FormFieldProps[] = [
  {
    label: "Endereço (Logradouro e Número)",
    type: "input",
    required: true,
    placeholder: "Ex: Rua das Acácias, 245",
    inputProps: { name: "address" },
    wrapperClassName: "md:col-span-3", // Replicates full-width row
  },
  {
    label: "Bairro",
    type: "input",
    required: true,
    placeholder: "Bairro",
    inputProps: { name: "bairro" },
    // Natural 2nd column placement in the grid
  },
  {
    label: "Cidade",
    type: "input",
    required: true,
    placeholder: "Cidade",
    inputProps: { name: "cidade" },
    // Natural 2nd column placement
  },
  {
    label: "Estado",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: BRAZIL_STATES,
      nativeSelectProps: { name: "estado", defaultValue: "RS" },
    },
    // Natural 1st column placement on its row
  },
  {
    label: "CEP",
    type: "input",
    placeholder: "00000-000",
    inputProps: { name: "cep", maxLength: 9 },
    // Natural 2nd column placement
  },
  {
    label: "Tipo de Imóvel",
    type: "select",
    required: true,
    placeholder: "Selecione o tipo",
    wrapperClassName: "md:col-span-2",
    selectProps: {
      options: propertyTypes,
      nativeSelectProps: { name: "tipoImovel" },
    },
    // Natural 1st column placement, spans only 1 column as standard
  },
];

export const ownerFields: FormFieldProps[] = [
  {
    label: "Nome Completo",
    type: "input",
    required: true,
    placeholder: "Nome completo",
    inputProps: {
      name: "locadorNome",
    },
    wrapperClassName: "md:col-span-3",
  },
  {
    label: "Gênero",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: genderTypes,
      nativeSelectProps: {
        name: "locadorGenero",
      },
    },
  },
  {
    label: "Estado Civil",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: civilStateTypes,
      nativeSelectProps: {
        name: "locadorEstadoCivil",
      },
    },
  },
  {
    label: "Profissão",
    type: "input",
    required: true,
    placeholder: "Ex.: Advogado",
    inputProps: { name: "locadorProfissao" },
  },
  {
    label: "Tipo de Documento",
    type: "toggle",
    required: true,
    toggleOptions: [
      { value: "cpf", label: "CPF" },
      { value: "rg", label: "RG" },
    ],
    wrapperClassName: "md:col-span-3 flex",
    toggleProps: { name: "locador" },
  },
  {
    label: "Endereço (Logradouro e número)",
    type: "input",
    required: true,
    inputProps: { name: "locadorEndereco" },
    placeholder: "Ex.: Rua das Camélias, 3442",
    wrapperClassName: "md:col-span-3",
  },
  {
    label: "Bairro",
    type: "input",
    required: true,
    inputProps: { name: "locadorBairro" },
    placeholder: "Ex.: Capão Novo",
    wrapperClassName: "md:col-span-1",
  },
  {
    label: "Cidade",
    type: "input",
    required: true,
    inputProps: { name: "locadorCidade" },
    placeholder: "Ex.: Capão da Canoa",
    wrapperClassName: "md:col-span-1",
  },
  {
    label: "Estado",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: BRAZIL_STATES,
      nativeSelectProps: { name: "estado", defaultValue: "RS" },
    },
  },
  {
    label: "CEP",
    type: "input",
    required: true,
    inputProps: { name: "locadorCep"},
    placeholder: "00000-000",
    wrapperClassName: "md:col-span-1",
  },
];

export const renterFields: FormFieldProps[] = [
  {
    label: "Nome Completo",
    type: "input",
    required: true,
    placeholder: "Nome completo",
    inputProps: {
      name: "locatarioNome",
    },
    wrapperClassName: "md:col-span-3",
  },
  {
    label: "Gênero",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: genderTypes,
      nativeSelectProps: {
        name: "locatarioGenero",
      },
    },
  },
  {
    label: "Estado Civil",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: civilStateTypes,
      nativeSelectProps: {
        name: "locatarioEstadoCivil",
      },
    },
  },
  {
    label: "Profissão",
    type: "input",
    required: true,
    placeholder: "Ex.: Advogado",
    inputProps: { name: "locatarioProfissao" },
  },
  {
    label: "Tipo de Documento",
    type: "toggle",
    required: true,
    toggleOptions: [
      { value: "cpf", label: "CPF" },
      { value: "rg", label: "RG" },
    ],
    wrapperClassName: "md:col-span-3 flex",
    toggleProps: { name: "locatario" },
  },
  {
    label: "Endereço (Logradouro e número)",
    type: "input",
    required: true,
    inputProps: { name: "locadorEndereco" },
    placeholder: "Ex.: Rua das Camélias, 3442",
    wrapperClassName: "md:col-span-3",
  },
  {
    label: "Bairro",
    type: "input",
    required: true,
    inputProps: { name: "locadorBairro" },
    placeholder: "Ex.: Capão Novo",
    wrapperClassName: "md:col-span-1",
  },
  {
    label: "Cidade",
    type: "input",
    required: true,
    inputProps: { name: "locadorCidade" },
    placeholder: "Ex.: Capão da Canoa",
    wrapperClassName: "md:col-span-1",
  },
  {
    label: "Estado",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: BRAZIL_STATES,
      nativeSelectProps: { name: "estado", defaultValue: "RS" },
    },
  },
  {
    label: "CEP",
    type: "input",
    required: true,
    inputProps: { name: "locadorCep", maxLength: 8 },
    placeholder: "00000-000",
    wrapperClassName: "md:col-span-1",
  },
];

export const financialDateFields: FormFieldProps[] = [
  {
    label: "Valor Mensal do Aluguel (R$)",
    type: "input",
    required: true,
    inputProps: {
      name: "valorAluguel",
      type: "number",
      step: "0.01",
      min: "0",
    },
    wrapperClassName: "md:col-span-1",
    placeholder: "Ex: 1.500,00",
  },
  {
    label: "Dia de Vencimento",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: paymentDayOptions,
      nativeSelectProps: { name: "vencimento", defaultValue: "5" },
    },
    wrapperClassName: "md:col-span-1",
  },
  {
    label: "Caução",
    type: "select",
    required: true,
    placeholder: "Selecione",
    selectProps: {
      options: securityDepositOptions,
      nativeSelectProps: { name: "caucao", defaultValue: "3" },
    },
    wrapperClassName: "md:col-span-1",
  },
  {
    label: "Início do Contrato",
    type: "input",
    required: true,
    inputProps: {
      name: "inicioContrato",
      type: "date",
    },
   
  },
   {
    label: "Término do Contrato",
    type: "input",
    required: true,
    inputProps: {
      name: "fimContrato",
      type: "date",
    },
    
  },
];
