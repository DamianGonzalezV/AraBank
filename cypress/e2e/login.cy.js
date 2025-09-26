/// <reference types="Cypress" />

let user = {
  name: "Jane Doe",
  username: "Janedoe82v",
  email: "janedoe82v@email.com",
  password: "passwerna",
};

describe("Login", () => {
  // Seed the db with a user
  beforeEach(() => {
    // cy.request({
    //   method: "POST",
    //   url: "http://localhost:6001/sign-up.html", // baseUrl is prepended
    //   form: true,
    //   body: user,
    // });
    cy.request("POST", "/auth/signup", user).then((response) => {});
  });

  // Test for login
  it("Should verify user can login with valid credentials", () => {
    cy.visit("/sign-up.html");
    cy.get('[data-qa="log-in-toggle-btn"]').click();
    cy.get('[data-qa="username-login"]').type(`${user.username}`);
    cy.get('[data-qa="password-login"]').type(`${user.password}`);
    cy.get('[data-qa="login-btn"]').click();
  });
});
