class CensimentoPage {

  constructor(page) {
    this.page = page;
  }

  async selectColumn() {
    await page.getByLabel('Scheda: attiva per ordinare').click({timeout: 300000});
  }

  async doSearch() {
    await page.getByPlaceholder('Cerca').click();
    await page.getByPlaceholder('Cerca').fill('lucania');
    await page.getByPlaceholder('Cerca').press('Enter');
  }

  async uploadCardButton() {
     // Attendere che il pulsante sia visibile prima di cliccare
    await page.waitForSelector('#modal_upload_censustechsheet_btn', { state: 'visible' });

    await page.locator('#modal_upload_censustechsheet_btn').click();
  }

  async selectCardFile() {
    const path = require('path');
    // Definire il percorso al tuo file SchedaCensimentoV2_Esempio1.xml
    const filePath = path.join(__dirname, 'test-data/SchedaCensimentoV2_Esempio1.xml');

    await page.waitForSelector('#upload_sheet_file', { state: 'visible' });

    // Assicurarsi che l'elemento di input invisibile per il file sia visibile e pronto per l'upload
    const inputFile = await page.locator('input[type="file"]');
    await inputFile.setInputFiles(filePath);
  }

  async confirmUpload() {
    // Attendere che il pulsante "OK" sia visibile prima di cliccare
    await page.getByRole('button', { name: 'OK' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'OK' }).click();
  }

  async clickAzioneDropdown() {
    await page.locator('.text-start > .btn').first().waitFor({ state: 'visible' });
    await page.locator('.text-start > .btn').first().click();
  }

  async downloadAzione() {
    await page.locator('[data-kt-cts-table-filter="download_row"]').first().click();
  }

  async deleteAzione() {
    await page.locator('[data-kt-cts-table-filter="delete_row"]').first().click();
    await page.locator('button.swal2-confirm.btn.fw-bold.btn-danger').first().click();
    await page.locator('button.swal2-confirm.btn.fw-bold.btn-primary').first().click();
  }

  async editAzione() {
    await page.locator('.text-start > .btn').first().waitFor({ state: 'visible' });
    await page.locator('.text-start > .btn').first().click();
    await page.locator('[data-kt-cts-table-filter="edit_row"]').first().click();
  }

  async freezeSchedaCensimento() {
    await page.locator('.text-start > .btn').first().waitFor({ state: 'visible' });
    await page.locator('.text-start > .btn').first().click();
    await page.locator('a[data-action="freeze"]').first().click();
  }

  async viewDetailSchedaCensimento() {
    await page.locator('.text-start > .btn').first().waitFor({ state: 'visible' });
    await page.locator('.text-start > .btn').first().click();
    await page.locator('a[data-kt-cts-table-filter="detail_row"]').first().click();
  }
}

module.exports = CensimentoPage;