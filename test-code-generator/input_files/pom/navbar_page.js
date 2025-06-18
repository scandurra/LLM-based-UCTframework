export class NavbarPage {
  constructor(page) {
    const italianoFlagLink = ' Lingua Italiano flag';
    const ingleseFlagLink = 'flag Inglese';

    this.page = page;

    this.userIcon = page.getByLabel('user_data');
    this.englishLanguageSelection = page.getByRole('link', { name: italianoFlagLink });
    this.italianLanguageSelection = page.getByRole('link', { name: ingleseFlagLink });
    this.logoutSelection = page.getByRole('link', { name: ' Logout' });
  }

  async clickUserIcon() {
    await this.userIcon.click();
  }

  async selectItalianLanguage() {
    await this.italianLanguageSelection.click();
  }

  async selectEnglishLanguage() {
    await this.englishLanguageSelection.click();
  }

  async isEnglishLanguageSelected() {
    return await this.englishLanguageSelection.isVisible();
  }

  async clickLogout() {
    this.logoutSelection.click();
  }
}