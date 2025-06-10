export class DashboardPagePdfDownload {
	constructor(page) {
		this.page = page;

		// Selectors
		this.downloadPDFButton = this.page.getByRole('button', { name: 'Download PDF' });
	}

	async downloadPDF() {
		await this.downloadPDFButton.click();
	}

	async isDownloadButtonVisible() {
		return await this.downloadPDFButton.isVisible();
	}
}