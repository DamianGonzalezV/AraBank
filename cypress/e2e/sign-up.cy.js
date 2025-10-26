/// <reference types="Cypress" />

describe("Sign up", () => {
  beforeEach(() => {
    cy.visit("/sign-up.html");
  });

  it("Should verify sign up visibility", () => {
    cy.get('[data-qa="sign-up-section"]').should("be.visible");
  });

  it("Should verify sign up page logo and h1", () => {
    cy.get('[data-qa="brand-p"]').should("contain.text", "ÅraBank");
    cy.get('[data-qa="brand-span"]').should(
      "contain.text",
      "Minimalist banking"
    );
  });

  it("Should verify sign up inputs and journey", () => {});

  it("Should verify sign up journey", () => {});

  it("Should verify legal information", () => {
    cy.get('[data-qa="sign-up-terms"]').should("include", /Terms/);
    cy.get('[data-qa="sign-up-terms"]').should("include", /Privacy Policy/);
  });
});
