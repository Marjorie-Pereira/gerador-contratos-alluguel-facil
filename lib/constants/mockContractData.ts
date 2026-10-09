import { rentalContractData } from "@/types/formInputs";

export const mockData: rentalContractData = {
  imovel: {
    endereco: {
      logradouro: "Av. Beira Mar, 1200, Apto 402",
      bairro: "Capão Novo",
      cidade: "Capão da Canoa",
      cep: "95555-000",
      estado: "RS",
    },
    tipoImovel: "Apartamento Residencial",
  },
  locador: {
    nome: "Carlos Eduardo Silveira",
    genero: "Masculino",
    documento: {
      tipo: "CPF",
      valor: "123.456.789-01",
    },
    nacionalidade: "Brasileira",
    estadoCivil: "Casado",
    profissao: "Engenheiro Civil",
    endereco: {
      estado: "RS",
      logradouro: "Rua Independência, 450",
      bairro: "Centro",
      cidade: "Porto Alegre",
      cep: "90010-000",
    },
  },
  locatario: {
    nome: "Juliana Mendes de Souza",
    genero: "Feminino",
    documento: {
      tipo: "CPF",
      valor: "987.654.321-09",
    },
    nacionalidade: "Brasileira",
    estadoCivil: "Solteira",
    profissao: "Designer Gráfica",
    endereco: {
      estado: "RS",
      logradouro: "Av. Protásio Alves, 2300",
      bairro: "Rio Branco",
      cidade: "Porto Alegre",
      cep: "90410-004",
    },
  },
  contrato: {
    valorCaucao: 3600.0,
    dataContrato: "2026-10-09",
    fimContrato: "2027-10-09",
    inicioContrato: "2026-11-01",
    caucao: 3,
    valorAluguel: 1200.0,
    vencimentoAluguel: "10",
  },
};
