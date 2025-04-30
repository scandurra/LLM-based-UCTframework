export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly authenticate: Locator;
    readonly errorMessage: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.loginButton = page.locator('text="Login"');
      this.emailInput = page.locator('#email');
      this.passwordInput = page.locator('#password');
      this.authenticate = page.locator("#submit");
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