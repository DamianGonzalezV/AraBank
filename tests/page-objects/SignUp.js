export class SignUp {
  constructor(page) {
    this.page = page;

    // Add logo div locators here

    // Add form locators
    this.fullName = page.getByLabel("Full name");
    this.username = page.getByLabel("Create a username");
    this.email = page.getByLabel("Add your email");
    this.password = page.getByLabel("Add a password");

    this.usernameLogin = page.getByLabel("Username");
    this.passwordLogin = page.getByLabel("Password");

    this.loginButton = page.getByTestId("login-btn");
    this.signUpButton = page.getByTestId("sign-up-btn");

    this.loginToggleButton = page.getByRole("button", {
      name: "Change to log in here",
    });
    this.signUpToggleButton = page.getByRole("button", {
      name: "Change to sign up here",
    });
  }

  async visitSignUp() {
    await this.page.goto("/sign-up.html");
  }

  async registerUser(fullName, username, email, password) {
    await this.fullName.fill(fullName);
    await this.username.fill(username);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signUpButton.click();
  }

  async changeToLogin() {
    await this.loginToggleButton.click();
  }

  async changeToSignUp() {
    await this.signUpToggleButton.click();
  }
}
