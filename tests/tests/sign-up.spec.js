import { test, expect } from "@playwright/test";
import { SignUp } from "../page-objects/SignUp";
import { beforeEach } from "node:test";

test.describe("Registration and Login Flow", () => {
  // beforeEach(() => async ({ page }) => {
  //   const signUpPage = new SignUp(page);
  //   await signUpPage.visitSignUp();
  // });

  test("Should fill sign up form inputs and labels and click sign up button", async ({
    page,
  }) => {
    const signUp = new SignUp(page);
    await signUp.visitSignUp();

    await signUp.registerUser(
      "Jane Doe",
      "Janedoe_1999",
      "Janedoe99@gmail.com",
      "securepassword1547!"
    );

    await expect(signUp.fullName).toHaveValue("Jane Doe");
    await expect(signUp.username).toHaveValue("Janedoe_1999");
    await expect(signUp.email).toHaveValue("Janedoe99@gmail.com");
    await expect(signUp.password).toHaveValue("securepassword1547!");
  });

  test("Should log a user", async ({ page }) => {
    const signUpPage = new SignUp(page);
  });

  test("Should change the screen to login", async ({ page }) => {
    const landingPage = new SignUp(page);
    await landingPage.visitSignUp();

    await landingPage.changeToLogin();
    await expect(landingPage.signUpToggleButton).toHaveText(
      "Change to sign up here"
    );
    await expect(landingPage.loginButton).toBeVisible();

    await landingPage.changeToSignUp();
    await expect(landingPage.loginToggleButton).toHaveText(
      "Change to log in here"
    );
    await expect(landingPage.signUpButton).toBeVisible();
  });
});
