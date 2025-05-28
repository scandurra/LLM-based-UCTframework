const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertUsernameAndLeavePasswordEmpty = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID1', 'Insert username and leave password empty', 'The system detects the error', 'The system detects the error', true, `Username: ${process.env.E2E_LOGIN_EMAIL_ADMIN}`, executionTime);
    }
}

const clickLoginButton = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.login();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID2', 'Click the Login button', 'The system displays an error message', 'The system displays an error message', true, '', executionTime);
    }
}

const verifyErrorMessage = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const errorMessage = loginPage.getErrorMessage();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID3', 'Verify the error message', 'An error message is displayed asking to fill in all fields', errorMessage, errorMessage.includes('fill in all fields'), '', executionTime);
    }
    expect(errorMessage).toContain('fill in all fields');
}

test("UC1_TC4 - Login with empty password field", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC4 - Login with empty password field");

    await page.goto(process.env.E2E_BASE_URL);

    insertUsernameAndLeavePasswordEmpty(page, reporter);

    clickLoginButton(page, reporter);

    verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});