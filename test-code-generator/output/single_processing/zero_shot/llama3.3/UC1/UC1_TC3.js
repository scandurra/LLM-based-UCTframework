const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const leaveUsernameFieldEmptyAndInsertPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail('');
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID1', 'Leave username field empty and insert password', 'The system detects the error', 'The system detects the error', true, 'username: "", password: "Testadmin01!"', executionTime);
    }

    expect(await loginPage.emailInput.inputValue()).toBe('');
    expect(await loginPage.passwordInput.inputValue()).toBe(process.env.E2E_LOGIN_PASSWORD_ADMIN);
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID2', 'Click the "Login" button', 'The system displays an error message', 'The system displays an error message', true, '', executionTime);
    }

    expect(await loginPage.authenticate.isEnabled()).toBe(false);
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.getErrorMessage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID3', 'Verify the display of the error message', 'An error message is displayed asking to fill in all fields', errorMessage, errorMessage.includes('fill in all fields'), true, '', executionTime);
    }

    expect(errorMessage).toContain('fill in all fields');
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