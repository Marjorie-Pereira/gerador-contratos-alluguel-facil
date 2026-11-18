import { fetchViaCep } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("fetchViaCep", () => {
  it("should return correct response for true cep", async () => {
    const testCep = "94696020";
    const expectedResponse = {
      cep: "94696-020",
      logradouro: "Avenida Paraguassu",
      bairro: "Posto 4 (Capão Novo)",
      localidade: "Capão da Canoa",
      uf: "RS",
    };

    const response = await fetchViaCep(testCep);

    const { cep, logradouro, bairro, localidade, uf } = response;
    const filteredResponse = {
      cep,
      localidade,
      logradouro,
      bairro,
      uf,
    };

    expect(filteredResponse).toEqual(expectedResponse);
  });
  it("should return error when cep not found", async () => {
    const testCep = "12345678";
    const response = await fetchViaCep(testCep);
    const { erro } = response;

    expect(erro).toBe("true");
  });
});
