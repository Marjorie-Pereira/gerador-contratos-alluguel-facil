import { formatDateToBrazilian } from "../../lib/utils";
import { mockData } from "../../lib/constants/mockContractData";
import { format } from "date-fns";

after(() => {
  cy.task("deleteFile", "cypress/downloads/contrato.pdf");
});

describe("Complete expected user flow of the app", () => {
  it("should submit form with success", () => {
    const formData = mockData;
    const contractDate = format(new Date(), "yyy-MM-dd");
    const documentPages = 3;
    const genArr = Array.from({ length: documentPages }, (v, k) => k + 1);

    // login
    cy.visit("/auth/login");
    cy.contains("acesso ao sistema").should("be.visible");
    cy.get("form").within(() => {
      cy.get("#email").type("teste@teste.com");
      cy.get("#password").type("Demouser");
      cy.get("button").click();
    });
    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("contrato de locação de imóvel", { matchCase: false }).should(
      "be.visible",
    );

    // fill the form
    cy.intercept("GET", "https://viacep.com.br/ws/**").as("viaCep");

    cy.get("#cep").type(formData.imovel.endereco.cep);
    cy.get("#cep").blur();

    cy.wait("@viaCep");

    cy.get("#logradouro").should(
      "have.value",
      formData.imovel.endereco.logradouro,
    );
    cy.get("#bairro").should("have.value", formData.imovel.endereco.bairro);
    cy.get("#cidade").should("have.value", formData.imovel.endereco.cidade);
    cy.get("#estado").should("contain.text", "Rio Grande do Sul (RS)");

    cy.get("#tipoImovel").click();
    cy.get('[role="option"]').contains("Apartamento").click();
    cy.get("#tipoImovel").should("contain.text", "Apartamento");

    //   property owner fields
    cy.get("#locadorNome")
      .should("be.visible")
      .and("be.enabled")
      .click()
      .type(formData.locador.nome)
      .should("have.value", formData.locador.nome);

    cy.get("#locadorNacionalidade")
      .should("be.visible")
      .should("be.enabled")
      .type(formData.locador.nacionalidade);
    cy.get("#locadorNacionalidade").should(
      "have.value",
      formData.locador.nacionalidade,
    );

    cy.get("#locadorGenero").click();

    cy.get('[role="option"]').contains("Masculino").click();

    cy.get("#locadorGenero").should("contain.text", "Masculino");

    cy.get("#locadorProfissao")
      .should("be.visible")
      .and("be.enabled")
      .click()
      .type(formData.locador.profissao)
      .should("have.value", formData.locador.profissao);

    cy.get("#locadorEstadoCivil").click();
    cy.get('[role="option"]').contains("Casado(a)").click();

    cy.get(`[aria-label='toggle ${formData.locador.documento.tipo}']`)
      .first()
      .click();
    cy.get('input[placeholder="0000000000"]').should("be.visible");
    cy.get('input[placeholder="0000000000"]').type(
      formData.locador.documento.valor,
    );

    cy.intercept("GET", "https://viacep.com.br/ws/**").as("viaCep");
    cy.get("#locadorCep").type(formData.locador.endereco.cep);
    cy.get("#locadorCep").blur();
    cy.wait("@viaCep");

    cy.get("#locadorEndereco").should(
      "have.value",
      formData.locador.endereco.logradouro,
    );
    cy.get("#locadorBairro").should(
      "have.value",
      formData.locador.endereco.bairro,
    );
    cy.get("#locadorCidade").should(
      "have.value",
      formData.locador.endereco.cidade,
    );

    cy.get("#locadorUf").should("contain.text", "Rio Grande do Sul (RS)");

    //   renter fields
    cy.get("#locatarioNome")
      .should("be.visible")
      .and("be.enabled")
      .click()
      .type(formData.locatario.nome)
      .should("have.value", formData.locatario.nome);

    cy.get("#locatarioNacionalidade")
      .should("be.visible")
      .should("be.enabled")
      .type(formData.locatario.nacionalidade);
    cy.get("#locatarioNacionalidade").should(
      "have.value",
      formData.locatario.nacionalidade,
    );

    cy.get("#locatarioProfissao")
      .should("be.visible")
      .should("be.enabled")
      .type(formData.locatario.profissao);
    cy.get("#locatarioProfissao").should(
      "have.value",
      formData.locatario.profissao,
    );

    cy.get("#locatarioGenero").click();
    cy.get('[role="option"]').contains("Feminino").click();

    cy.get("#locatarioEstadoCivil").click();
    cy.get('[role="option"]').contains("Solteiro(a)").click();

    cy.get("#locatarioDocumento")
      .should("be.visible")
      .and("be.enabled")
      .click()
      .type(formData.locatario.documento.valor)
      .should("have.value", formData.locatario.documento.valor);

    cy.intercept("GET", "https://viacep.com.br/ws/**").as("viaCep");
    cy.get("#locatarioCep").type(formData.locatario.endereco.cep);
    cy.get("#locatarioCep").blur();
    cy.wait("@viaCep");

    cy.get("#locatarioEndereco").should(
      "have.value",
      formData.locatario.endereco.logradouro,
    );
    cy.get("#locatarioBairro").should(
      "have.value",
      formData.locatario.endereco.bairro,
    );
    cy.get("#locatarioCidade").should(
      "have.value",
      formData.locatario.endereco.cidade,
    );
    cy.get("#locatarioUf").should("contain.text", "Rio Grande do Sul (RS)");

    cy.get("#valorAluguel").type(formData.contrato.valorAluguel.toString());

    cy.get("#vencimentoAluguel").click();
    cy.get('[role="option"]').contains("Dia 10").click();

    cy.get("#caucao").click();
    cy.get('[role="option"]').contains("3 meses").click();

    cy.get("#inicioContrato").type(formData.contrato.inicioContrato);
    cy.get("#fimContrato").should("have.value", formData.contrato.fimContrato);

    cy.get("button[type=submit]").click();

    // assert the generated document has the correct data
    cy.url().should("contain", "/preview");
    cy.get(".react-pdf__Document").should("exist");
    cy.get(".react-pdf__Page").should("be.visible");
    cy.contains(".react-pdf__Page", formData.imovel.endereco.logradouro).should(
      "exist",
    );
    cy.contains(".react-pdf__Page", formData.locador.nome.toUpperCase()).should(
      "exist",
    );
    cy.contains(
      ".react-pdf__Page",
      formData.locatario.nome.toUpperCase(),
    ).should("exist");

    cy.contains(
      ".react-pdf__Page",
      formatDateToBrazilian(formData.contrato.inicioContrato),
    ).should("exist");

    cy.contains(
      ".react-pdf__Page",
      formatDateToBrazilian(formData.contrato.fimContrato),
    ).should("exist");

    cy.wrap(genArr).each(() => {
      cy.contains("Próxima").click();
    });

    cy.contains(".react-pdf__Page", formatDateToBrazilian(contractDate)).should(
      "exist",
    );

    cy.contains("Download").click();
    cy.readFile("cypress/downloads/contrato.pdf");

    // sign user out
    cy.visit("/");
    cy.contains("contrato de locação de imóvel", { matchCase: false }).should(
      "be.visible",
    );

    cy.get("[data-slot=drawer-trigger]").click();
    cy.contains("Usuário Teste").should("be.visible");
    cy.contains("sair", { matchCase: false }).click();

    cy.url().should("include", "/auth/login");
  });
});
