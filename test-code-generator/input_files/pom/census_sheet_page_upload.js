const { timeout } = require('../../playwright.config');

export class CensusSheetPageUpload {
  constructor(page) {
    this.page = page;
    this.path = require('path');
    
    // Locators
    this.uploadButton = page.locator('#modal_upload_censustechsheet_btn');
    this.fileInput = page.locator('input[type="file"]');    
  }

  async waitForUploadSchedaModalButton() {
    await this.page.waitForSelector('#modal_upload_censustechsheet_btn', { state: 'visible' }); 
  }

  async clickUploadSchedaModalButton() {
    await this.uploadButton.click();
  }

  async waitForUploadModal() {
    await this.page.waitForSelector('#upload_sheet_file', { state: 'visible' });
  }

  // filePath = path.join(__dirname, 'test-data/SchedaCensimentoV2_Esempio1.xml');
  async setInputFiles(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  async waitForUploadApplyButton() {
    await this.page.getByRole('button', { name: 'OK' }).waitFor({ state: 'visible' });
  }

  async clickUploadApplyButton() {
    await this.page.getByRole('button', { name: 'OK' }).click();
  }
}
