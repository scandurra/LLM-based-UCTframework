const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC2_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC2/UC2_TC1.spec.js');

const clickDownloadButtonWithoutConfirmation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC3_ID1', 'Clicca sul tasto di download del PDF senza confermare', false, await dashboardPage.isImpiantiVisible(), true, '', executionTime);
    }

    expect(await dashboardPage.isImpiantiVisible()).toBe(false);
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPage(page);
    const errorMessage = await page.getByText('Mappa impianti d\'illuminazioneLoading...Completa i campi della form e premi').isVisible();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC3_ID2', 'Verifica la presenza di un messaggio di errore', true, errorMessage, true, '', executionTime);
    }

    expect(errorMessage).toBe(true);
}

test("UC2.1_TC3 - Download PDF senza conferma", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC3 - Download PDF senza conferma");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAsRegisteredUser(page, null);
    await selectDashboardMenu(page, null);

    await clickDownloadButtonWithoutConfirmation(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});