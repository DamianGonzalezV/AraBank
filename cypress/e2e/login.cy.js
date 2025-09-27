/// <reference types="Cypress" />

let user = {
  name: "Jane Doe",
  username: "Janedoe82v",
  email: "janedoe82v@email.com",
  password: "passwerna",
};

describe("Login - Positive scenario", () => {
  // Seed the db with a user
  beforeEach(() => {
    cy.request("POST", "/auth/signup", user).then((response) => {
      expect(response.status).to.eq(201);
    });
    cy.visit("/sign-up.html");
    cy.get('[data-qa="log-in-toggle-btn"]').click();
  });

  // Test for login
  it("Should verify user can login with valid credentials", () => {
    cy.get('[data-qa="username-login"]').type(`${user.username}`);
    cy.get('[data-qa="password-login"]').type(`${user.password}`);
    cy.get('[data-qa="login-btn"]').click();

    cy.location("pathname").should("eq", "/app.html");
    cy.get('[data-qa="welcome-row-user-span"]').should(
      "have.text",
      `${user.username}`
    );
  });
});

describe("Login - Negative scenario", () => {
  beforeEach(() => {
    cy.request("POST", "/auth/signup", user).then((response) => {
      expect(response.status).to.eq(201);
    });
    cy.visit("/sign-up.html");
    cy.get('[data-qa="log-in-toggle-btn"]').click();
  });

  it("Shuld verify error message for invalid username", () => {
    cy.get('[data-qa="username-login"]').type("invalidJane");
    cy.get('[data-qa="password-login"]').type(`${user.password}`);
    cy.get('[data-qa="login-btn"]').click();
  });
});
