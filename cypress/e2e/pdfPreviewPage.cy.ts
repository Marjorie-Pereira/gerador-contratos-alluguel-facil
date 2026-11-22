import { mockData } from "../../lib/constants/mockContractData";

describe("PreviewPDFPage", () => {
  it("should display mock admin data for user with demo role", () => {
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

    cy.visit("/preview", {
      onBeforeLoad(win) {
        win.sessionStorage.setItem("contractData", JSON.stringify(mockData));
      },
    });

    cy.get(".react-pdf__Document").should("exist");
    cy.get(".react-pdf__Page").should("be.visible");
    cy.contains(".react-pdf__Page", "MARIA HELENA DA SILVA").should("exist");
  });
});
