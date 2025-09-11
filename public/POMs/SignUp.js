export class SignUp {
  constructor(page) {
    this.page = page;

    // Add logo div locators here

    // Addd form locators
    this.fullName = page.getByLabel("name");
    this.username = page.getByLabel("username");
    this.email = page.getByLabel("email");
    this.password = page.getByLabel("password");
  }

  async visitSignUp() {
    await this.page.goto("/sign-up.html");
  }

  async fillAllInputs(fullName, username, email, password) {
    await this.fullName.fill(fullName);
    await this.username.fill(username);
    await this.email.fill(email);
    await this.password.fill(password);
  }
}
