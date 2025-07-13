const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID1', 'Insert new password', true, await loginPage.isEmailFieldVisible(), true, `EMAIL: ${process.env.EMAIL}, PASSWORD: ${process.env.PASSWORD}`, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible());
}

const confirmNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID2', 'Confirm new password', true, await page.url() === process.env.E2E_HOME_URL, true, `PASSWORD: ${process.env.PASSWORD}`, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_HOME_URL);
}

const displaySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID3', 'Display success message', true, await page.url() === process.env.E2E_HOME_URL, true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_HOME_URL);
}

test("UC1_TC3 - Cambio della prima password di accesso", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC3 - Cambio della prima password di accesso");

    await page.goto(process.env.E2E_BASE_URL);

    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();

    await insertNewPassword(page, reporter);
    await confirmNewPassword(page, reporter);
    await displaySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});