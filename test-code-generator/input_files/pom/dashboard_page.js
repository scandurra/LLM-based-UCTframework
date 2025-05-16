export class DashboardPage {
  readonly page: Page;
  readonly downloadButton: Locator;
  readonly comuneSelect: Locator;
  readonly showImpiantiButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.downloadButton = page.getByRole('button', { name: 'Download PDF' });
    this.comuneSelect = page.getByLabel('Comuni', { exact: true });
    this.showImpiantiButton = page.locator('#compute_apply_geomap_1');
  }

  async downloadPdf() {
    await this.downloadButton.click();
  }

  async selectComune(index) {
    comuneSelect.selectOption({index: index});
  }

  async showImpianti() {
    showImpiantiButton.click();
  }

  async isImpiantiVisible() {
    return await page.getByText('Mappa impianti d\'illuminazioneLoading...Completa i campi della form e premi').isVisible();
  }
}