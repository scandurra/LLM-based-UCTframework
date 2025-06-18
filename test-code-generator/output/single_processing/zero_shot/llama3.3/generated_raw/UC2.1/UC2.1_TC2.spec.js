const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC2_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC2/UC2_TC1.spec.js');

const clickDownloadButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC2_ID1', 'Clicca sul tasto di download del PDF', true, await dashboardPage.isImpiantiVisible(), true, '', executionTime);
    }

    expect(await dashboardPage.isImpiantiVisible()).toBe(true);
}

const cancelDownloadRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Annulla la richiesta di download
    await page.evaluate(() => { 
        const xhr = new XMLHttpRequest();
        xhr.abort();
    });

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC2_ID2', 'Annulla la richiesta di download', true, true, true, '', executionTime);
    }
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Verifica il messaggio di errore
    const errorMessage = await page.getByText('Errore durante il download del file').isVisible();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC2_ID3', 'Verifica il messaggio di errore', true, errorMessage, true, '', executionTime);
    }

    expect(errorMessage).toBe(true);
}

test("UC2.1_TC2 - Download PDF con errore di conferma", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC2 - Download PDF con errore di conferma");

    await UC1_TC1(page, null);
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);

    await clickDownloadButton(page, reporter);
    await cancelDownloadRequest(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});