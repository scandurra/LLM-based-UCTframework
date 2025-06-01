const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

// Step 1
const enterSpecialPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword('Test@dm1n!$');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC10_ID1', 'Enter special password', 'Password accepted', 'Password accepted', true, { password: 'Test@dm1n!$' }, executionTime);
    }
    
    await expect(loginPage.passwordInput).toBeVisible();
}

// Step 2
const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC10_ID2', 'Click login button', 'Authentication proceeds', 'Authentication proceeds', true, {}, executionTime);
    }
    
    await expect(loginPage.authenticate).not.toBeVisible();
}

// Step 3
const verifyLogin = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC10_ID3', 'Verify login', 'Login successful', errorMessage ? 'Error: ' + errorMessage : 'Login successful', !errorMessage, {}, executionTime);
    }
    
    await expect(errorMessage).toBeNull();
}

test("UC1_TC10 - Login with special characters in password", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC10 - Login with special characters in password");
    await page.goto(process.env.E2E_LOGIN_URL);

    await enterSpecialPassword(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyLogin(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});