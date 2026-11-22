import { mockData } from "../../lib/constants/mockContractData";

describe("Complete expected user flow of the app", () => {
  it("should submit form with success", () => {
    const formData = mockData;

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
    cy.get("#cep").type(formData.imovel.endereco.cep);
    cy.get("#cep").blur();

    cy.get("#logradouro").should(
      "have.value",
      formData.imovel.endereco.logradouro,
    );
    cy.get("#bairro").should("have.value", formData.imovel.endereco.bairro);
    cy.get("#cidade").should("have.value", formData.imovel.endereco.cidade);
    cy.get("#estado").should("contain.text", "Rio Grande do Sul (RS)");

    cy.get("#tipoImovel").click();
    cy.get('[role="option"]').contains("Apartamento").click();

    //   property owner fields
    cy.get("#locadorNome").type(formData.locador.nome);
    cy.get("#locadorNacionalidade").type(formData.locador.nacionalidade);

    cy.get("#locadorGenero").click();
    cy.get('[role="option"]').contains("Masculino").click();

    cy.get("#locadorProfissao").type(formData.locador.profissao);

    cy.get("#locadorEstadoCivil").click();
    cy.get('[role="option"]').contains("Casado(a)").click();

    cy.get(`[aria-label='toggle ${formData.locador.documento.tipo}']`)
      .first()
      .click();
    cy.get('input[placeholder="0000000000"]').should("be.visible");
    cy.get('input[placeholder="0000000000"]').type(
      formData.locador.documento.valor,
    );
    cy.get("#locadorCep").type(formData.locador.endereco.cep);
    cy.get("#locadorCep").blur();

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
    cy.get("#locatarioNome").type(formData.locatario.nome);
    cy.get("#locatarioNacionalidade").type(formData.locatario.nacionalidade);

    cy.get("#locatarioProfissao").type(formData.locatario.profissao);

    cy.get("#locatarioGenero").click();
    cy.get('[role="option"]').contains("Feminino").click();

    cy.get("#locatarioEstadoCivil").click();
    cy.get('[role="option"]').contains("Solteiro(a)").click();

    cy.get("#locatarioDocumento").type(formData.locatario.documento.valor);
    cy.get("#locatarioCep").type(formData.locatario.endereco.cep);
    cy.get("#locatarioCep").blur();

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
  });
});
