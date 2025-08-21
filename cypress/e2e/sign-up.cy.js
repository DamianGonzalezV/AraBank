describe("Sign up page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should verify sign up visibility", () => {
    cy.get('[data-qa="sign-up-section"]').should("be.visible");
  });
  it("Should verify sign up page logo and h1", () => {
    cy.get('[data-qa="sign-up-section"]')
      .find("h1")
      .should("contain.text", "Åra Bank");
    cy.get('[data-qa="sign-up-section"]').find("i").should("exist");
  });
  it("Should verify sign up inputs and journey", () => {
    cy.get('[data-qa="sign-up-form"]')
      .find("label")
      .first()
      .should("have.text", "Name and surname");
    cy.get('[data-qa="sign-up-form"]').find("input").first().type("Jane Doe");
    cy.get('[data-qa="sign-up-form"]')
      .find("label")
      .eq(1)
      .should("have.text", "Create a username");
    cy.get('[data-qa="sign-up-form"]').find("input").eq(1).type("JaneDoe1999");
    cy.get('[data-qa="sign-up-form"]')
      .find("label")
      .last()
      .should("have.text", "Add your email");
    cy.get('[data-qa="sign-up-form"]')
      .find("input")
      .last()
      .type("Jane_doe_ae@gmail.com");
    cy.get('[data-qa="sign-up-btn"]').click();
  });
});
