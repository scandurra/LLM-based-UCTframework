const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

const accessSystemAsRegisteredUser = function(page, reporter) {
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

const selectDashboardMenu = function(page, reporter) {
    const startTime = new Date().getTime();
    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Select dashboard menu', 'Dashboard section opened', page.url(), page.url() === process.env.E2E_DASHBOARD_URL, '', executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1 - Apertura della dashboard con utente autorizzato");

    accessSystemAsRegisteredUser(page, reporter);

    selectDashboardMenu(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});