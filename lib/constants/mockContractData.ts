import { rentalContractData } from "@/types/formInputs";

export const mockData: rentalContractData = {
  imovel: {
    endereco: {
      logradouro: "Avenida Paraguassu",
      bairro: "Posto 4 (Capão Novo)",
      cidade: "Capão da Canoa",
      cep: "94696-020",
      estado: "RS",
    },
    tipoImovel: "apartamento",
  },
  locador: {
    nome: "Carlos Eduardo Silveira",
    genero: "masculino",
    documento: {
      tipo: "RG",
      valor: "1234567890",
    },
    nacionalidade: "brasileiro",
    estadoCivil: "casado",
    profissao: "Engenheiro Civil",
    endereco: {
      estado: "RS",
      logradouro: "Rua Siqueira Campos",
      bairro: "Centro Histórico",
      cidade: "Porto Alegre",
      cep: "90010-000",
    },
  },
  locatario: {
    nome: "Juliana Mendes de Souza",
    genero: "Feminino",
    documento: {
      tipo: "CPF",
      valor: "372.251.100-39",
    },
    nacionalidade: "brasileira",
    estadoCivil: "solteira",
    profissao: "Designer Gráfica",
    endereco: {
      estado: "RS",
      logradouro: "Avenida Protásio Alves",
      bairro: "Rio Branco",
      cidade: "Porto Alegre",
      cep: "90410-004",
    },
  },
  contrato: {
    valorCaucao: 3600.0,
    dataContrato: "2026-10-09",
    fimContrato: "2027-11-01",
    inicioContrato: "2026-11-01",
    caucao: 3,
    valorAluguel: 1200.0,
    vencimentoAluguel: "10",
  },
};

export const adminData = {
  nome: "Maria Helena da Silva",
  estadoCivil: "Casada",
  nacionalidade: "Brasileira",
  profissao: "Corretora de Imóveis",
  cpf: "123.456.789-00",
  endereco: "Avenida Paulista, 1000, Apto 42, Bela Vista, São Paulo - SP",
};
