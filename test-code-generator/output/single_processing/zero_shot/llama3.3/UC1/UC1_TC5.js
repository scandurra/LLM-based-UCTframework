const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertDefaultCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    await loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID1', 'Insert default credentials for the first time', 'The system requires a password change', await loginPage.getErrorMessage() !== null, true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, E2E_LOGIN_PASSWORD_ADMIN: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
    }

    expect(await loginPage.getErrorMessage()).not.toBeNull();
}

const insertNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.enterPassword('NewPassword01!');
    await loginPage.enterPassword('NewPassword01!');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID2', 'Insert the new password and confirm it', 'The password is accepted and changed', true, true, 'NewPassword01!', executionTime);
    }

    await loginPage.login();
}

const verifyNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword('NewPassword01!');
    await loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID3', 'Verify that the new password is active', 'The system allows access with the new password', await page.url() === process.env.E2E_BASE_URL, true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, NewPassword01!`, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_BASE_URL);
}

test("UC1_TC5 - Change password on first authentication", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC5 - Change password on first authentication");

    await page.goto(process.env.E2E_BASE_URL);

    await insertDefaultCredentials(page, reporter);
    await insertNewPassword(page, reporter);
    await verifyNewPassword(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});