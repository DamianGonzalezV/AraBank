import { test, expect } from "@playwright/test";
import { Registration } from "../page-objects/SignUp";
import { user } from "../user.json";

// let user = {
//   name: "Jane Doe",
//   username: "Janedoe82v",
//   email: "janedoe82v@email.com",
//   password: "passwerna",
// };

test.describe("Should login a user with valid credentials", () => {
  test.beforeAll(async ({ request }) => {
    // Seed the database
    console.log("Seeding the database 🌱");
    const response = await request.post("auth/signup", { data: user });

    // Confirm request is successful
    expect(response.ok()).toBeTruthy();
  });

  test("should login the user with valid credentials", async ({ page }) => {
    const login = new Registration(page);

    login.visitSignUp();
    login.changeToLogin();
    login.loginUser(user.username, user.password);

    await expect(login.usernameLogin).toHaveValue(user.username);
    await expect(login.password).toHaveValue(user.password);
  });
});
