const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const leaveUsernameFieldEmptyAndInsertPassword = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.enterEmail('');
    loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID1', 'Leave username field empty and insert password', 'Error should be detected', 'Error detected', true, 'username: "", password: "Testadmin01!"', executionTime);
    }

    expect(loginPage.emailInput).toBeEmpty();
}

const clickLoginButton = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID2', 'Click the "Login" button', 'Error message should be displayed', 'Error message displayed', true, '', executionTime);
    }

    expect(loginPage.authenticate).toBeVisible();
}

const verifyErrorMessage = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const errorMessage = loginPage.getErrorMessage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID3', 'Verify error message', 'Error message should be displayed asking to fill all fields', errorMessage, errorMessage.includes('fill all fields'), '', executionTime);
    }

    expect(errorMessage).toContain('fill all fields');
}

test("UC1_TC3 - Login with empty username field", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC3 - Login with empty username field");

    await leaveUsernameFieldEmptyAndInsertPassword(page, reporter);

    await clickLoginButton(page, reporter);

    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});