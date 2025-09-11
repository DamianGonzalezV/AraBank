import { test, expect } from "@playwright/test";
import { SignUp } from "../public/POMs/SignUp";

test("Should verify form inputs and labels", async ({ page }) => {
  const signUp = new SignUp(page);

  await signUp.visitSignUp();
  await signUp.fillAllInputs(
    "Jane Doe",
    "Janedoe_1999",
    "Janedoe99@gmail.com",
    "securepassword1547!"
  );

  await expect(signUp.fullName).toHaveValue("Jane Doe");
});
