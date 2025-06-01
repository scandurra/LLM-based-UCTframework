const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertInvalidCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail('invalid-email');
    await loginPage.enterPassword('invalid-password');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Insert invalid credentials', 'Credentials are rejected', 'Credentials inserted', true, 'Invalid email and password', executionTime);
    }

    expect(await loginPage.emailInput.inputValue()).toBe('invalid-email');
    expect(await loginPage.passwordInput.inputValue()).toBe('invalid-password');
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID2', 'Click the Login button', 'Error message is displayed', 'Login button clicked', true, '', executionTime);
    }

    expect(await loginPage.authenticate).toBeVisible();
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID3', 'Verify error message', 'Error message is displayed', errorMessage, errorMessage !== null, '', executionTime);
    }

    expect(errorMessage).not.toBeNull();
}

test("UC1_TC2 - Login with wrong credentials", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC2 - Login with wrong credentials");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await insertInvalidCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});