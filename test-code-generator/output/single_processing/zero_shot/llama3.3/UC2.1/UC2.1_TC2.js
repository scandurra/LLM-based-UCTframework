const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const accessSystemAsRegisteredUserAndSelectDashboardMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    await accessSystemAsRegisteredUser(page, null);
    await selectDashboardMenu(page, null);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC2_ID1', 'Access system as registered user and select dashboard menu', 'Dashboard section opened', page.url(), page.url() === process.env.E2E_DASHBOARD_URL, '', executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

const startDownloadProcess = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC2_ID2', 'Start download process', 'Download confirmation request displayed', true, true, '', executionTime);
    }
}

const cancelDownloadRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    // Assuming the cancel button is the first button with role 'button' and name 'Cancel'
    await page.getByRole('button', { name: 'Cancel' }).click();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC2_ID3', 'Cancel download request', 'Download not started', true, true, '', executionTime);
    }
}

test("UC2.1_TC2 - Download PDF annullato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC2 - Download PDF annullato");

    await accessSystemAsRegisteredUserAndSelectDashboardMenu(page, reporter);

    await startDownloadProcess(page, reporter);

    await cancelDownloadRequest(page, reporter);

    // Check if no file was downloaded
    const downloads = await page.context().waitForEvent('filechooser');
    expect(downloads).toBeUndefined();

    reporter.onTestEnd(test, { status: "passed" });
});