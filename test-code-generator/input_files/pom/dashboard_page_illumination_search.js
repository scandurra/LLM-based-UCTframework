class DashboardPageIlluminationSearch {
    constructor(page) {
        this.page = page;
        
        // Selectors
        this.comuniDropdown = this.page.getByLabel('Comuni', { exact: true });
        this.applyGeomapButton = this.page.locator('#compute_apply_geomap_1');
        this.mapText = this.page.getByText('Mappa impianti d\'illuminazioneLoading...Completa i campi della form e premi');
    }

    async selectComune(optionIndex = 0) {
        await this.comuniDropdown.selectOption({ index: optionIndex });
    }

    async applySearch() {
        await this.applyGeomapButton.click();
    }

    async isMapVisible() {
        return await this.mapText.isVisible();
    }

    async isComuniDropdownVisible() {
        return await this.comuniDropdown.isVisible();
    }

    async isApplyButtonVisible() {
        return await this.applyGeomapButton.isVisible();
    }
}

module.exports = DashboardPageIlluminationSearch;