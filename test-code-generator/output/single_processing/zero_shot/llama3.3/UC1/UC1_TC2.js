const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertInvalidCredentials = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.enterEmail('invalid-email');
    loginPage.enterPassword('invalid-password');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Insert invalid credentials', 'Credentials are rejected', 'Credentials inserted', true, 'Invalid email and password', executionTime);
    }
}

const clickLoginButton = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Click the Login button', 'Error message is displayed', 'Login button clicked', true, '', executionTime);
    }
}

const verifyErrorMessage = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const errorMessage = loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Verify error message is displayed', 'Error message is shown', errorMessage, errorMessage !== null, '', executionTime);
    }
    expect(errorMessage).not.toBeNull();
}

test("UC1_TC2 - Login with incorrect credentials", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC2 - Login with incorrect credentials");

    await page.goto(process.env.E2E_BASE_URL);

    insertInvalidCredentials(page, reporter);

    clickLoginButton(page, reporter);

    verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});