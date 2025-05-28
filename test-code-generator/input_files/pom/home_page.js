class HomePage {

    constructor(page) {
      this.page = page;
      this.dashboardButton = page.getByRole('link', { name: 'Dashboard' });
    }

    async navigateToDashboard() {
        await this.dashboardButton.click();
    }

    async navigateToCensimento() {
        await page.getByRole('link', { name: 'Scheda Censimento' }).click();
    }

    async clickOnProfile() {
        await page.getByLabel('user_data').click();
    }

    async changeLanguage() {
        await page.getByRole('link', { name: italianoFlagLink }).click();
        await page.getByRole('link', { name: ingleseFlagLink }).click();
    }
}

module.exports = HomePage;