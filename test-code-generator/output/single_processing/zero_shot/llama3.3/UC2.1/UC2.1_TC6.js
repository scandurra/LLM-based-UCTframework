const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const accessSystemAsRegisteredUser = function(page, reporter) {
    // implementation as provided in the example code
}

const selectDashboardMenu = function(page, reporter) {
    // implementation as provided in the example code
}

const attemptDownloadPdfWithUnsupportedBrowser = function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC6_ID1', 'Attempt to download PDF with unsupported browser', 'Error message displayed', page.url(), await dashboardPage.page.isVisible('#error-message'), '', executionTime);
    }
    expect(await dashboardPage.page.isVisible('#error-message')).toBeTruthy();
}

test("UC2.1_TC6 - Download PDF con browser non supportato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC6 - Download PDF con browser non supportato");

    accessSystemAsRegisteredUser(page, reporter);

    selectDashboardMenu(page, reporter);

    attemptDownloadPdfWithUnsupportedBrowser(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const accessSystemAsRegisteredUser = function(page, reporter) {
    // implementation as before
}

const selectDashboardMenu = function(page, reporter) {
    // implementation as before
}

const attemptDownloadPdfWithUnsupportedBrowser = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.downloadPdf();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC6_ID1', 'Attempt to download PDF with unsupported browser', 'Error message displayed', page.url(), await dashboardPage.page.isVisible('text=Browser non supportato'), '', executionTime);
    }

    expect(await dashboardPage.page.isVisible('text=Browser non supportato')).toBeTruthy();
}

test("UC2.1_TC6 - Download PDF con browser non supportato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC6 - Download PDF con browser non supportato");

    accessSystemAsRegisteredUser(page, reporter);

    selectDashboardMenu(page, reporter);

    attemptDownloadPdfWithUnsupportedBrowser(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');

const accessSystemAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    navigateToLoginPage(page, null);
    enterCorrectCredentials(page, null);
    clickLoginButton(page, null);
    verifySuccessMessage(page, null);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Access system as registered user', 'Home page displayed', page.url(), page.url() === process.env.E2E_BASE_URL, '', executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const selectDashboardMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new DashboardPage(page);
    await homePage.showImpianti();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Select dashboard menu', 'Dashboard section opened', page.url(), page.url() === process.env.E2E_DASHBOARD_URL, '', executionTime);
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
        reporter.addStep('UC2.1_TC6_ID1', 'Attempt to download PDF', 'Error message displayed', 'Error message', await page.isVisible('#error-message'), '', executionTime);
    }
    expect(await page.isVisible('#error-message')).toBeTruthy();
}

test("UC2.1_TC6 - Download PDF con browser non supportato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC6 - Download PDF con browser non supportato");

    accessSystemAsRegisteredUser(page, reporter);

    selectDashboardMenu(page, reporter);

    attemptDownloadPdf(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});