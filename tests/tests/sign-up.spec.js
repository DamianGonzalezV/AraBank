import { test, expect } from "@playwright/test";
import { Registration } from "../page-objects/SignUp";
import { beforeEach } from "node:test";

test.describe("Registration and Login Flow", () => {
  // beforeEach(() => async ({ page }) => {
  //   const signUpPage = new SignUp(page);
  //   await signUpPage.visitSignUp();
  // });

  test("Should fill sign up form inputs and labels and click sign up button", async ({
    page,
  }) => {
    const signUp = new Registration(page);
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

  test("Should change the screen to login", async ({ page }) => {
    const signUp = new Registration(page);
    await signUp.visitSignUp();

    await signUp.changeToLogin();
    await expect(signUp.signUpToggleButton).toHaveText(
      "Change to sign up here"
    );
    await expect(signUp.loginButton).toBeVisible();

    await signUp.changeToSignUp();
    await expect(signUp.loginToggleButton).toHaveText("Change to log in here");
    await expect(signUp.signUpButton).toBeVisible();
  });
});
