const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const attemptDownloadPdfWithoutAuthorization = function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC5_ID1', 'Attempt to download PDF without authorization', 'Access denied message displayed', page.url(), page.url() === process.env.E2E_BASE_URL, '', executionTime);
    }
    expect(await dashboardPage.page.isVisible('text="Accesso negato"')).toBeTruthy();
}

test("UC2.1_TC5 - Download PDF senza autorizzazione", async ({page}) => {
    const reporter = new TestResultReporter();
    reporter.setTestCase("UC2.1_TC5 - Download PDF senza autorizzazione");

    attemptDownloadPdfWithoutAuthorization(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const accessSystemAsUnauthorizedUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    await page.goto(process.env.E2E_DASHBOARD_URL);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC5_ID1', 'Access system as unauthorized user', 'Dashboard page displayed', page.url(), page.url() === process.env.E2E_DASHBOARD_URL, '', executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

const attemptDownloadPdf = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC5_ID2', 'Attempt to download PDF', 'Access denied message displayed', page.url(), await dashboardPage.isImpiantiVisible(), '', executionTime);
    }
    expect(await dashboardPage.isImpiantiVisible()).toBeFalsy();
}

test("UC2.1_TC5 - Download PDF senza autorizzazione", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC5 - Download PDF senza autorizzazione");

    await accessSystemAsUnauthorizedUser(page, reporter);

    await attemptDownloadPdf(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const accessSystemAsUnauthorizedUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    await page.goto(process.env.E2E_BASE_URL);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC5_ID1', 'Access system as unauthorized user', 'Home page displayed', page.url(), page.url() === process.env.E2E_BASE_URL, '', executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const navigateToDashboardPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    await page.goto(process.env.E2E_DASHBOARD_URL);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC5_ID2', 'Navigate to dashboard page', 'Dashboard page displayed', page.url(), page.url() === process.env.E2E_DASHBOARD_URL, '', executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

const attemptDownloadPdf = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC5_ID3', 'Attempt to download PDF', 'Access denied message displayed', await page.isVisible('#access-denied-message'), true, '', executionTime);
    }
    expect(await page.isVisible('#access-denied-message')).toBe(true);
}

test("UC2.1_TC5 - Download PDF senza autorizzazione", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC5 - Download PDF senza autorizzazione");

    await accessSystemAsUnauthorizedUser(page, reporter);

    await navigateToDashboardPage(page, reporter);

    await attemptDownloadPdf(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});