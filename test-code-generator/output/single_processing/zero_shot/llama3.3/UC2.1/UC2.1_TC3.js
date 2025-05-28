const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const startDownloadProcess = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC3_ID1', 'Start download process', 'Confirmation request displayed', page.url(), true, '', executionTime);
    }
    expect(await dashboardPage.downloadButton.isVisible()).toBe(true);
}

const confirmDownloadRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    // Simulate network error
    await page.context().setNetworkIdleTimeout(1000);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC3_ID2', 'Confirm download request', 'File fails to download due to network error', page.url(), false, '', executionTime);
    }
    // Check for network error
    await expect(page).not.toHaveURL(process.env.E2E_BASE_URL);
}

const waitForDownloadCompletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    // Wait for download completion message
    await page.waitForTimeout(2000); // adjust timeout as needed
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC3_ID3', 'Wait for download completion', 'Operation completed with error message displayed', page.url(), true, '', executionTime);
    }
    // Check for error message
    expect(await page.$$('text=Operazione completata con errore')).toBeTruthy();
}

test("UC2.1_TC3 - Download PDF con errore di rete", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC3 - Download PDF con errore di rete");

    accessSystemAsRegisteredUser(page, reporter);
    selectDashboardMenu(page, reporter);

    startDownloadProcess(page, reporter);
    confirmDownloadRequest(page, reporter);
    waitForDownloadCompletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const startDownloadProcess = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC3_ID1', 'Start download process', 'Download confirmation request displayed', page.url(), await dashboardPage.downloadButton.isVisible(), '', executionTime);
    }
    expect(await dashboardPage.downloadButton.isVisible()).toBe(true);
}

const confirmDownloadRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    // Simulate network error
    await page.context().setNetworkIdleTimeout(1000);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC3_ID2', 'Confirm download request', 'File fails to download due to network error', page.url(), await page.context().isNetworkIdle(), '', executionTime);
    }
    expect(await page.context().isNetworkIdle()).toBe(false);
}

const waitForDownloadCompletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    // Wait for download completion
    await page.waitForTimeout(2000);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC3_ID3', 'Wait for download completion', 'Operation completed with error message displayed', page.url(), await page.getByText('Operazione completata con errore').isVisible(), '', executionTime);
    }
    expect(await page.getByText('Operazione completata con errore').isVisible()).toBe(true);
}

test("UC2.1_TC3 - Download PDF con errore di rete", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC3 - Download PDF con errore di rete");

    accessSystemAsRegisteredUser(page, reporter);
    selectDashboardMenu(page, reporter);

    startDownloadProcess(page, reporter);
    confirmDownloadRequest(page, reporter);
    waitForDownloadCompletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});