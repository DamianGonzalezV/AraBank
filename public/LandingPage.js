export class LandingPage {
  constructor(page) {
    this.page = page;

    // Locators here
    this.textLogo = this.page.getByTestId("brand-nav-p");
    this.signUpButton = this.page.getByTestId("sign-up-btn-landpage");
    this.mapButton = this.page.getByTestId("map-btn-landpage");
    this.h1Hero = this.page.getByRole("heading", {
      name: "Minimalist design. Maximum clarity",
    });
    this.heroImage = this.page.getByAltText("card image floating");
    this.heroSmallText = this.page.getByTestId("hero-line");
  }

  // Actions here

  // Instance method to visit
  async visit() {
    await this.page.goto("/");
  }
}
