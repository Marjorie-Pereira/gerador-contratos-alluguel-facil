import { rentalFormData, rentalFormSchema } from "@/schemas/rentalFormSchema";
import { zodErrorMessage } from "@/types/errors";
import { describe, it, expect } from "vitest";

const input: rentalFormData = {
  logradouro: "Av. Beira Mar, 1200, Apto 402",
  bairro: "Capão Novo",
  cidade: "Capão da Canoa",
  cep: "95555000",
  estado: "RS",
  tipoImovel: "Apartamento Residencial",
  locadorNome: "Carlos Eduardo Silveira",
  locadorGenero: "Masculino",
  locadorDocumento: { tipo: "CPF", valor: "320.130.480-84" },
  locadorNacionalidade: "Brasileiro",
  locadorEstadoCivil: "Casado",
  locadorProfissao: "Engenheiro Civil",
  locadorUf: "RS",
  locadorEndereco: "Rua Independência, 450",
  locadorBairro: "Centro",
  locadorCidade: "Porto Alegre",
  locadorCep: "90010000",
  locatarioNome: "Juliana Mendes de Souza",
  locatarioGenero: "Feminino",
  locatarioDocumento: { tipo: "CPF", valor: "680.599.900-63" },
  locatarioNacionalidade: "Brasileira",
  locatarioEstadoCivil: "Solteira",
  locatarioProfissao: "Designer Gráfica",
  locatarioEndereco: "Av. Protásio Alves, 2300",
  locatarioBairro: "Rio Branco",
  locatarioCidade: "Porto Alegre",
  locatarioUf: "RS",
  locatarioCep: "90410004",
  valorAluguel: 1200,
  caucao: 3,
  inicioContrato: "2026-10-09",
  fimContrato: "2027-10-09",
  vencimentoAluguel: "10",
};

describe("rental form schema", () => {
  it("should return success if every field is correctly filled", () => {
    const result = rentalFormSchema.safeParse(input);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(input);
  });
  it("should return error if CEP field is invalid format", () => {
    const testInput = { ...input, cep: "1234-567" };

    const result = rentalFormSchema.safeParse(testInput);
    const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

    expect(result.success).toBe(false);
    expect(error.code).toBe("invalid_format");
    expect(error.path.includes("cep")).toBe(true);
  });
  it("should return error if CEP field is less than 8 characters long", () => {
    const testInput = { ...input, cep: "9555000" };
    const result = rentalFormSchema.safeParse(testInput);
    const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

    expect(result.success).toBe(false);
    expect(error.code).toBe("too_small");
    expect(error.path.includes("cep")).toBe(true);
  });

  describe("test for CPF field", () => {
    it("should return error if locadorDocumento is invalid format", () => {
      const testInput = {
        ...input,
        locadorDocumento: { tipo: "CPF", valor: "123" },
      };
      const result = rentalFormSchema.safeParse(testInput);
      const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

      expect(result.success).toBe(false);
      expect(error.path.includes("locadorDocumento")).toBe(true);
    });

    it("should return error if locadorDocumento is invalid regex", () => {
      const testInput = {
        ...input,
        locadorDocumento: { tipo: "CPF", valor: "123.456.789-01" },
      };
      const result = rentalFormSchema.safeParse(testInput);
      const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

      expect(result.success).toBe(false);
      expect(error.path.includes("locadorDocumento")).toBe(true);
    });

    it("should return error if locatarioDocumento is invalid format", () => {
      const testInput = {
        ...input,
        locatarioDocumento: { tipo: "CPF", valor: "123" },
      };
      const result = rentalFormSchema.safeParse(testInput);
      const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

      expect(result.success).toBe(false);
      expect(error.path.includes("locatarioDocumento")).toBe(true);
    });

    it("should return error if locatarioDocumento is invalid regex", () => {
      const testInput = {
        ...input,
        locatarioDocumento: { tipo: "CPF", valor: "123.456.789-01" },
      };
      const result = rentalFormSchema.safeParse(testInput);
      const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

      expect(result.success).toBe(false);
      expect(error.path.includes("locatarioDocumento")).toBe(true);
    });
  });

  describe("test for RG field", () => {
    it("should return error if locadorDocumento is invalid format", () => {
      const testInput = {
        ...input,
        locadorDocumento: { tipo: "RG", valor: "123" },
      };
      const result = rentalFormSchema.safeParse(testInput);
      const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

      expect(result.success).toBe(false);
      expect(error.path.includes("locadorDocumento")).toBe(true);
    });

    it("should return error if locatarioDocumento is invalid format", () => {
      const testInput = {
        ...input,
        locatarioDocumento: { tipo: "RG", valor: "123" },
      };
      const result = rentalFormSchema.safeParse(testInput);
      const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

      expect(result.success).toBe(false);
      expect(error.path.includes("locatarioDocumento")).toBe(true);
    });
  });

  it("should return error if valorAluguel is equal to 0", () => {
    const testInput = { ...input, valorAluguel: 0 };
    const result = rentalFormSchema.safeParse(testInput);
    const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

    expect(result.success).toBe(false);
    expect(error.code).toBe("too_small");
    expect(error.path.includes("valorAluguel")).toBe(true);
  });

  it("should return error if fimContrato is before inicioContrato", () => {
    const testInput = {
      ...input,
      inicioContrato: "2026-11-14",
      fimContrato: "2025-11-14",
    };
    const result = rentalFormSchema.safeParse(testInput);
    const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

    expect(result.success).toBe(false);
    expect(error.path.includes("fimContrato")).toBe(true);
  });

  it("should return error if any field is empty", () => {
    const testInput = {
      ...input,
      logradouro: "",
    };
    const result = rentalFormSchema.safeParse(testInput);

    expect(result.success).toBe(false);
  });
});
