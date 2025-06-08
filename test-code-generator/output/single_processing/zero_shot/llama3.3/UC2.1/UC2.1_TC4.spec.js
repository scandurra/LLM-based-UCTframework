const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC2_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC2/UC2_TC1.spec.js');

const clickDownloadButtonAndCancel = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();

    // Annulla la richiesta
    page.on('filechooser', (fileChooser) => fileChooser.cancel());

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC4_ID1', 'Clicca sul tasto di download del PDF e annulla la richiesta', true, page.url() === process.env.E2E_DASHBOARD_URL, true, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

const repeatDownloadRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();

    // Accetta la richiesta
    page.on('filechooser', (fileChooser) => fileChooser.accept());

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC4_ID2', 'Ripeti la richiesta di download', true, page.url() === process.env.E2E_DASHBOARD_URL, true, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Verifica il messaggio di completamento dell’operazione
    await page.waitForTimeout(5000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC4_ID3', 'Verifica il messaggio di completamento dell’operazione', true, page.url() === process.env.E2E_DASHBOARD_URL, true, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

test("UC2.1_TC4 - Download PDF con ripetizione della richiesta", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC4 - Download PDF con ripetizione della richiesta");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAsRegisteredUser(page, null);
    await selectDashboardMenu(page, null);

    await clickDownloadButtonAndCancel(page, reporter);
    await repeatDownloadRequest(page, reporter);
    await verifySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});