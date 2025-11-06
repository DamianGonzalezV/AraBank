/// <reference types="Cypress" />
import { v4 as uuidv4 } from "uuid";

describe("Login - Positive scenario", () => {
  // Seed the db with a user
  beforeEach(() => {
    cy.fixture("user.json")
      .then((user) => {
        user.username = `test_${uuidv4()}`;
        user.email = `test_${uuidv4()}@email.com`;
      })
      .as("userData");
    cy.get("@userData").then((user) => {
      cy.signUpUser(user);
    });
    cy.navigateToLogin();
  });

  // Test for login
  it("Should verify user can login with valid credentials", () => {
    // toggle to login

    cy.get("@userData").then(({ username, password }) => {
      cy.get('[data-qa="username-login"]').type(`${username}`);
      cy.get('[data-qa="password-login"]').type(`${password}`);
      cy.get('[data-qa="login-btn"]').click();
      cy.location("pathname").should("eq", "/app.html");
      cy.get('[data-qa="welcome-row-user-span"]').should(
        "have.text",
        `${username}`
      );
    });
  });
});

describe("Login - Negative scenario", () => {
  beforeEach(() => {
    cy.fixture("user.json")
      .then((user) => {
        user.username = `test_${uuidv4()}`;
        user.email = `test_${uuidv4()}@email.com`;
      })
      .as("userData");
    cy.get("@userData").then((user) => {
      cy.signUpUser(user);
    });
    cy.navigateToLogin();
  });

  it("Should verify error message for empty inputs", () => {
    cy.get('[data-qa="login-btn"]').click();
    cy.get('[data-qa="registration-error-message"]').should(
      "have.text",
      "Please fill out all inputs!"
    );
  });

  it("Should verify error message for invalid username", () => {
    cy.get("@userData").then(({ password }) => {
      cy.get('[data-qa="username-login"]').type("invaliduser");
      cy.get('[data-qa="password-login"]').type(`${password}`);
      cy.get('[data-qa="login-btn"]').click();
      cy.get('[data-qa="registration-error-message"]').should(
        "have.text",
        "User does not exist"
      );
    });
  });

  it("Should verify error message for invalid password", () => {
    cy.get("@userData").then(({ username }) => {
      cy.get('[data-qa="username-login"]').type(`${username}`);
      cy.get('[data-qa="password-login"]').type("Invalid password");
      cy.get('[data-qa="login-btn"]').click();
      cy.get('[data-qa="registration-error-message"]').should(
        "have.text",
        "Unauthorized. Password is not valid"
      );
    });
  });
});
