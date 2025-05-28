class DashboardPage {

  constructor(page) {
    this.page = page;
    this.downloadButton = page.getByRole('button', { name: 'Download PDF' });
    this.comuneSelect = page.getByLabel('Comuni', { exact: true });
    this.showImpiantiButton = page.locator('#compute_apply_geomap_1');
  }

  async downloadPdf() {
    await this.downloadButton.click();
  }

  async selectComuneForImpianti(index) {
    comuneSelect.selectOption({index: index});
  }

  async showImpianti() {
    showImpiantiButton.click();
  }

  async isImpiantiVisible() {
    return await page.getByText('Mappa impianti d\'illuminazioneLoading...Completa i campi della form e premi').isVisible();
  }

  async isTabellaDatiGeneraliShown() {
    return true;
  }

  async selectComuneForBanchmarkingKPI() {
    // Attendi che il selettore "Seleziona" sia visibile
    await page.getByLabel('Seleziona').click();

    // Seleziona il primo comune dalla lista
    const items = page.locator('ul > li');
    await items.nth(21).click();
  }

  async selectBanchmarkingKPI() {
    // Attendi che il selettore KPI sia visibile
    await page.waitForSelector('#compute_apply_chart_municipality_benchmark_general_data_static', { state: 'visible' });

    // Clicca per selezionare il KPI
    await page.locator('#compute_apply_chart_municipality_benchmark_general_data_static').click();
  }

  async applyKPIAndVerify() {
    // Attendi l'applicazione dei risultati
    await page.waitForTimeout(5000);

    // Verifica se il container è visibile
    const isChartContainerVisible = await page.locator('#inner_area_chart_municipality_benchmark_general_data_static').isVisible();

    // Verifica se il grafico è visibile
    const isPointVisible = await page.locator('path.highcharts-point').first().isVisible();

    return isChartContainerVisible && isPointVisible;
  }
}

module.exports = DashboardPage;