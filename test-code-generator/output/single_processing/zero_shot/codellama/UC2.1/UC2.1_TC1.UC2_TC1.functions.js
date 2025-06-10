const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const DashboardPagePdfDownload = require("../../models/page_object_models/dashboard_page_pdf_download.js");

async function step1_CliccaSulTastoDiDownloadDelPDF(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Clicca sul tasto di download del PDF
    await DashboardPagePdfDownload.downloadPDFButton.click();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Clicca sul tasto di download del PDF', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the download button is visible and enabled
    await expect(DashboardPagePdfDownload.downloadPDFButton).toBeVisible();
    await expect(DashboardPagePdfDownload.downloadPDFButton).not.toBeDisabled();
}

async function step2_ConfermaLaRichiestaDiDownload(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Conferma la richiesta di download
    await page.waitForSelector('downloads-manager');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Conferma la richiesta di download', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the downloads manager is visible and enabled
    await expect(page.getByRole('downloads-manager')).toBeVisible();
    await expect(page.getByRole('downloads-manager')).not.toBeDisabled();
}

async function step3_VerificaIlMessaggioDiCompletamentoDellOperazione(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Verifica il messaggio di completamento dell'operazione
    await page.waitForSelector('success-message');
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Verifica il messaggio di completamento dell\'operazione', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the success message is visible and enabled
    await expect(page.getByRole('success-message')).toBeVisible();
    await expect(page.getByRole('success-message')).not.toBeDisabled();
}