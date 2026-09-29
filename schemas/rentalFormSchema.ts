import * as z from "zod";
import { cpf } from "cpf-cnpj-validator";

export const rentalFormSchema = z.object({
  logradouro: z.string().nonempty("Preencha este campo"),
  bairro: z.string("Preencha este campo").nonempty(),
  cidade: z.string("Preencha este campo").nonempty(),
  cep: z.string("Preencha este campo").length(8, "Insira o CEP corretamente"),
  estado: z.string().nonempty(),
  tipoImovel: z.string("Selecione uma opção").nonempty(),
  locadorNome: z.string("Preencha este campo").nonempty(),
  locadorGenero: z.string("Selecione uma opção").nonempty(),
  locadorDocumento: z
    .object({ tipo: z.string(), valor: z.string() })
    .refine(
      (value) =>
        value.tipo === "RG"
          ? value.valor.length === 10
          : cpf.isValid(value.valor),
      { message: "Formato inválido" },
    ),
  locadorNacionalidade: z.string("Preencha este campo").nonempty(),
  locadorEstadoCivil: z.string("Selecione uma opção").nonempty(),
  locadorProfissao: z.string("Preencha este campo").nonempty(),
  locadorUf: z.string("Selecione uma opção").nonempty(),
  locadorEndereco: z.string("Preencha este campo").nonempty(),
  locadorBairro: z.string("Preencha este campo").nonempty(),
  locadorCidade: z.string("Preencha este campo").nonempty(),
  locadorCep: z
    .string("Preencha este campo")
    .length(8, "Insira o CEP corretamente"),
  locatarioNome: z.string("Preencha este campo").nonempty(),
  locatarioGenero: z.string("Selecione uma opção").nonempty(),
  locatarioDocumento: z
    .object({ tipo: z.string(), valor: z.string() })
    .refine(
      (value) =>
        value.tipo === "RG"
          ? value.valor.length === 10
          : cpf.isValid(value.valor),
      { message: "Formato inválido" },
    ),
  locatarioNacionalidade: z.string("Preencha este campo").nonempty(),
  locatarioEstadoCivil: z.string("Selecione uma opção").nonempty(),
  locatarioProfissao: z.string("Preencha este campo").nonempty(),
  locatarioEndereco: z.string("Preencha este campo").nonempty(),
  locatarioBairro: z.string("Preencha este campo").nonempty(),
  locatarioCidade: z.string("Preencha este campo").nonempty(),
  locatarioUf: z.string("Preencha este campo").nonempty(),
  locatarioCep: z
    .string("Preencha este campo")
    .length(8, "Insira o CEP corretamente"),
  valorAluguel: z.coerce
    .number<number>("Preencha este campo")
    .gt(0, "Deve ser maior que zero!"),
  vencimentoAluguel: z.string("Selecione uma opção").nonempty(),
  caucao: z.coerce.number<number>("Selecione uma opção"),
  inicioContrato: z.iso.date("Data inválida"),
  fimContrato: z.iso.date("Data inválida"),
});

export type rentalFormData = z.infer<typeof rentalFormSchema>;
