export type formInputs = {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  tipoImovel: string;
  locadorNome: string;
  locadorGenero: string;
  locadorDocumento: string;
  locadorNacionalidade: string;
  locadorEstadoCivil: string;
  locadorProfissao: string;
  locadorUf: string;
  locadorEndereco: string;
  locadorBairro: string;
  locadorCidade: string;
  locadorCep: string;
  locatarioNome: string;
  locatarioGenero: string;
  locatarioDocumento: string;
  locatarioNacionalidade: string;
  locatarioEstadoCivil: string;
  locatarioProfissao: string;
  locatarioEndereco: string;
  locatarioBairro: string;
  locatarioCidade: string;
  locatarioUf: string;
  locatarioCep: string;
  valorAluguel: string;
  vencimentoAluguel: string;
  caucao: string;
  inicioContrato: string;
  fimContrato: string;
};

export type rentalContractData = {
  imovel: {
    endereco: {
      logradouro: string;
      bairro: string;
      cidade: string;
      cep: string;
      estado: string;
    };
    tipoImovel: string;
  };
  locador: {
    nome: string;
    genero: string;
    documento: { tipo: string; valor: string };
    nacionalidade: string;
    estadoCivil: string;
    profissao: string;
    endereco: {
      estado: string;
      logradouro: string;
      bairro: string;
      cidade: string;
      cep: string;
    };
  };
  locatario: {
    nome: string;
    genero: string;
    documento: { tipo: string; valor: string };
    nacionalidade: string;
    estadoCivil: string;
    profissao: string;
    endereco: {
      estado: string;
      logradouro: string;
      bairro: string;
      cidade: string;
      cep: string;
    };
  };
  contrato: {
    valorCaucao: number;
    dataContrato: string;
    fimContrato: string;
    inicioContrato: string;
    caucao: number;
    valorAluguel: number;
    vencimentoAluguel: string;
  };
};
