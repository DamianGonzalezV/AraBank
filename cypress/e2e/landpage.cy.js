/// <reference types="Cypress" />

describe("Landpage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should verify the navigation items and click sign up button", () => {
    cy.get('[data-qa="landpage-nav"]').find("p").should("have.text", "ÅraBank");
    cy.get('[data-qa="landpage-nav"]')
      .find("a")
      .should("contain", "Sign up")
      .click();
    cy.location("pathname").should("eq", "/sign-up.html");
  });
});
