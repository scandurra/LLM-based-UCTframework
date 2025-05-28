const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertDefaultCredentials = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID1', 'Insert default credentials for the first time', 'The system requires a password change', 'Password change required', true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, E2E_LOGIN_PASSWORD_ADMIN: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
    }

    expect(await loginPage.getErrorMessage()).toContain('password change');
}

const insertNewPassword = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const newPassword = 'NewTestadmin01!';
    loginPage.enterPassword(newPassword);
    loginPage.enterPassword(newPassword); // confirm password
    loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID2', 'Insert the new password and confirm it', 'The password is accepted and changed', 'Password changed', true, `New Password: ${newPassword}`, executionTime);
    }

    expect(await page.url()).not.toContain('login');
}

const verifyNewPassword = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    loginPage.enterPassword('NewTestadmin01!');
    loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID3', 'Verify that the new password is active', 'The system allows access with the new password', 'Access granted', true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, New Password: NewTestadmin01!`, executionTime);
    }

    expect(await page.url()).not.toContain('login');
}

test("UC1_TC5 - Cambio password alla prima autenticazione", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC5 - Cambio password alla prima autenticazione");

    await page.goto(process.env.E2E_BASE_URL);

    insertDefaultCredentials(page, reporter);

    insertNewPassword(page, reporter);

    verifyNewPassword(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});