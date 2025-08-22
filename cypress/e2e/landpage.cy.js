/// <reference types="Cypress" />

describe("Landpage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should verify the nav items and click sign up button", () => {
    cy.get('[data-qa="landpage-nav"]').find("p").should("have.text", "ÅraBank");
    cy.get('[data-qa="landpage-nav"]')
      .find("a")
      .should("contain", "Sign up")
      .click();
    cy.location("pathname").should("eq", "/sign-up.html");
  });

  it("Should verify the hero items", () => {
    cy.get('[data-qa="hero-section"]')
      .find("img")
      .should("have.attr", "alt", "card image floating");
    cy.get('[data-qa="hero-section"]')
      .find("h1")
      .should("have.text", "Minimalist design. Maximum clarity.");
    cy.get('[data-qa="hero-section"]')
      .find("p")
      .should("have.class", "hero-line")
      .and("contain", "Banking made simple");
  });
});
