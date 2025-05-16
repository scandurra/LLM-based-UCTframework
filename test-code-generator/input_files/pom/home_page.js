export class HomePage {
    readonly page: Page;
    readonly dashboardButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.dashboardButton = page.getByRole('link', { name: ' Dashboard' });
    }

    async navigateToDashboard() {
        await this.dashboardButton.click();
    }
  }