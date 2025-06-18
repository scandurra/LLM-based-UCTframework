export class SidebarPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.dashboardLink = page.getByRole('link', { name: ' Dashboard' });
    this.censusSheetLink = page.getByRole('link', { name: ' Scheda Censimento' });
  }

  // Login flow methods
  async clickDashboardLink() {
    await this.dashboardLink.click();
  }

  async clickCensusSheetLink() {
    await this.censusSheetLink.click();
  }
}
