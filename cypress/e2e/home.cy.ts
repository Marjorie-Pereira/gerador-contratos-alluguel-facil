describe("Home", () => {
  it("should sign user out", () => {
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

    cy.get("[data-slot=drawer-trigger]").click();
    cy.contains("Usuário Teste").should("be.visible");
    cy.contains("sair", { matchCase: false }).click();

    cy.url().should("include", "/auth/login");
  });
});
