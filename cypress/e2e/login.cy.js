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
      cy.getByTestId("username-login").type(`${username}`);
      cy.getByTestId("password-login").type(`${password}`);
      cy.getByTestId("login-btn").click();
      cy.location("pathname").should("eq", "/app.html");
      cy.getByTestId("welcome-row-user-span").should(
        "have.text",
        `${username}`,
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
    cy.getByTestId("login-btn").click();
    cy.getByTestId("registration-error-message").should(
      "have.text",
      "Please fill out all inputs!",
    );
  });

  it("Should verify error message for invalid username", () => {
    cy.get("@userData").then(({ password }) => {
      cy.getByTestId("username-login").type("invaliduser");
      cy.getByTestId("password-login").type(`${password}`);
      cy.getByTestId("login-btn").click();
      cy.getByTestId("registration-error-message").should(
        "have.text",
        "User does not exist",
      );
    });
  });

  it("Should verify error message for invalid password", () => {
    cy.get("@userData").then(({ username }) => {
      cy.getByTestId("username-login").type(`${username}`);
      cy.getByTestId("password-login").type("Invalid password");
      cy.getByTestId("login-btn").click();
      cy.getByTestId("registration-error-message").should(
        "have.text",
        "Unauthorized. Password is not valid",
      );
    });
  });
});
