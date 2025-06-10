export class DashboardPageGeneralDataTable {
  constructor(page) {
    this.page = page;
    
    // Table navigation selectors
    this.generalDataTable = this.page.getByText('Tabella Dati generaliNessun datoLoading...ComuneRegioneN° di Punti LuceConsumo');
    this.nextButton = this.page.getByLabel('Successivo');
    this.pageOneLink = this.page.getByRole('link', { name: '1' });
    this.elementsDropdown = this.page.getByLabel('Mostra 102550100 elementi');
    this.regionSortButton = this.page.getByLabel('Regione: attiva per ordinare');
    this.pointsLightSortButton = this.page.getByLabel('N° di Punti Luce: attiva per');
  }

  async getTableContent() {
    const content = await this.generalDataTable.allTextContents();
    return content[0];
  }

  async navigateToNextPage() {
    await this.nextButton.click();
  }

  async navigateToPageOne() {
    await this.pageOneLink.click();
  }

  async changeElementsPerPage(value = '25') {
    await this.elementsDropdown.selectOption(value);
  }

  async sortByRegion() {
    await this.regionSortButton.click();
  }

  async sortByPointsOfLight() {
    await this.pointsLightSortButton.click();
  }

  async isTableVisible() {
    return await this.generalDataTable.isVisible();
  }

  async isNextButtonVisible() {
    return await this.nextButton.isVisible();
  }

  async isElementsDropdownVisible() {
    return await this.elementsDropdown.isVisible();
  }

  async isSortButtonsVisible() {
    const regionVisible = await this.regionSortButton.isVisible();
    const pointsVisible = await this.pointsLightSortButton.isVisible();
    return regionVisible && pointsVisible;
  }
}
