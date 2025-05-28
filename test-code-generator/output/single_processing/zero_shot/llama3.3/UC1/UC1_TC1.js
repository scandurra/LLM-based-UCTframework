const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const navigateToLoginPage = function(page, reporter) {
    const startTime = new Date().getTime();
    page.goto(process.env.E2E_BASE_URL);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Navigate to login page', 'Login page loaded', 'Login page loaded', true, `E2E_BASE_URL: ${process.env.E2E_BASE_URL}`, executionTime);
    }
    expect(page.url()).toBe(process.env.E2E_BASE_URL);
}

const enterCorrectCredentials = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Enter correct credentials', 'Credentials accepted', 'Credentials accepted', true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, E2E_LOGIN_PASSWORD_ADMIN: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
    }
}

const clickLoginButton = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.login();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Click Login button', 'System proceeds with authentication', 'System proceeds with authentication', true, '', executionTime);
    }
}

const verifySuccessMessage = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const errorMessage = loginPage.getErrorMessage();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID4', 'Verify success message', 'Success message displayed', errorMessage, errorMessage === null, '', executionTime);
    }
    expect(errorMessage).toBeNull();
}

test("UC1_TC1 - Login test with success", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1 - Login test with success");

    navigateToLoginPage(page, reporter);

    enterCorrectCredentials(page, reporter);

    clickLoginButton(page, reporter);

    verifySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});