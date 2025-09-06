import { test, expect } from "@playwright/test";
import { LandingPage } from "../public/POMs/LandingPage";

test("Should render Landing Page", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.visit();
  // Assertions here
  await expect(landingPage.textLogo).toBeVisible();
  await expect(landingPage.signUpButton).toBeVisible();
  await expect(landingPage.mapButton).toBeVisible();
  await expect(landingPage.h1Hero).toHaveText(
    "Minimalist design. Maximum clarity."
  );
  await expect(landingPage.heroImage).toBeVisible();
  await expect(landingPage.heroSmallText).toContainText("Banking made simple");
});

test("Should go from land page to sign up", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.visit();
  await landingPage.goToSignUp();
  // await page.pause();
  await expect(page).toHaveURL("/sign-up.html");
});
