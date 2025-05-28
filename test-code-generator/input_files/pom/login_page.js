class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.loginButton = page.locator('text="Login"');
      this.emailInput = page.locator('input[name="email"]');
      this.passwordInput = page.locator('input[name="password"]');
      this.authenticate = page.locator("button.submit");
      this.errorMessage = page.locator('.error-message');
    }

    async displayLoginForm() {
        await this.loginButton.click();
    }

    async enterEmail(email) {
        await this.emailInput.fill(email);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async login() {
        await this.authenticate.click();
    }
}

module.exports = LoginPage;