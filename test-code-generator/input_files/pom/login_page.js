class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.emailInput = page.getByLabel('E-mail');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    
    // Selectors
    this.emailFieldSelector = 'input[name="email"]';
  }

  // Login flow methods
  async clickLoginLink() {
    await this.loginLink.click();
  }

  async isEmailFieldVisible() {
    return await this.page.isVisible(this.emailFieldSelector);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
