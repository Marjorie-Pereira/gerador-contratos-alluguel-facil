describe("Login", () => {
  it("should login user successfully", () => {
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
  });
});
