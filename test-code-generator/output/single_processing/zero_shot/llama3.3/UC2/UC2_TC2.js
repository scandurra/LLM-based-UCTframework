const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

const accessSystemAsGuest = function(page, reporter) {
    const startTime = new Date().getTime();
    page.goto(process.env.E2E_BASE_URL);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC2_ID1', 'Access system as guest', 'Home page displayed', page.url() === process.env.E2E_BASE_URL, page.url() === process.env.E2E_BASE_URL, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const tryToAccessDashboardDirectly = function(page, reporter) {
    const startTime = new Date().getTime();
    page.goto(`${process.env.E2E_BASE_URL}dashboard`);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC2_ID2', 'Try to access dashboard directly', 'Access denied page displayed', page.url() !== `${process.env.E2E_BASE_URL}dashboard`, page.url() !== `${process.env.E2E_BASE_URL}dashboard`, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
    }
    expect(page.url()).not.toBe(`${process.env.E2E_BASE_URL}dashboard`);
}

test("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione");

    navigateToLoginPage(page, null); // UC1
    enterCorrectCredentials(page, null); // UC1
    clickLoginButton(page, null); // UC1

    const homePage = new HomePage(page);
    await homePage.navigateToDashboard();

    accessSystemAsGuest(page, reporter);

    tryToAccessDashboardDirectly(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});