class DashboardPageBenchmarkingKpi {
  constructor(page) {
    this.page = page;
    
    // City selection selectors
    this.citySelector = this.page.getByLabel('Seleziona');
    this.cityItems = this.page.locator('ul > li');
    
    // KPI selection selectors
    this.kpiSelector = this.page.locator('#compute_apply_chart_municipality_benchmark_general_data_static');
    
    // Results verification selectors
    this.chartContainer = this.page.locator('#inner_area_chart_municipality_benchmark_general_data_static');
    this.chartPoint = this.page.locator('path.highcharts-point').first();
  }

  async openCitySelector() {
    await this.citySelector.click();
  }

  async selectCityByIndex(cityIndex = 21) {
    await this.cityItems.nth(cityIndex).click();
  }

  async selectCity(cityIndex = 21) {
    await this.openCitySelector();
    await this.selectCityByIndex(cityIndex);
  }

  async waitForKPISelectorVisible() {
    await this.page.waitForSelector('#compute_apply_chart_municipality_benchmark_general_data_static', { state: 'visible' });
  }

  async selectKPI() {
    await this.waitForKPISelectorVisible();
    await this.kpiSelector.click();
  }

  async waitForResults(timeout = 5000) {
    await this.page.waitForTimeout(timeout);
  }

  async isChartContainerVisible() {
    return await this.chartContainer.isVisible();
  }

  async isChartPointVisible() {
    return await this.chartPoint.isVisible();
  }

  async verifyKPIResults() {
    const isChartContainerVisible = await this.isChartContainerVisible();
    const isPointVisible = await this.isChartPointVisible();
    
    return isChartContainerVisible || isPointVisible;
  }

  async applyKPIAndVerify(timeout = 5000) {
    await this.waitForResults(timeout);
    return await this.verifyKPIResults();
  }

  async isCitySelectorVisible() {
    return await this.citySelector.isVisible();
  }

  async isKPISelectorVisible() {
    return await this.kpiSelector.isVisible();
  }
}

module.exports = DashboardPageBenchmarkingKpi;