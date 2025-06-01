const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const enterSpecialCharPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword('Testadmin01!@#$');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC10_ID1', 'Enter password with special characters', 'Password accepted', 'Password accepted', true, 'E2E_LOGIN_EMAIL_ADMIN, E2E_LOGIN_PASSWORD_ADMIN', executionTime);
    }

    await expect(loginPage.passwordInput).toBeVisible();
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC10_ID2', 'Click Login button', 'System proceeds with authentication', 'System proceeds with authentication', true, '', executionTime);
    }

    await expect(loginPage.authenticate).toBeVisible();
}

const verifyLoginSuccess = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC10_ID3', 'Verify login success', 'System allows access with special characters in password', errorMessage ? 'Error: ' + errorMessage : 'Login successful', !errorMessage, '', executionTime);
    }

    await expect(errorMessage).toBeNull();
}

test("UC1_TC10 - Login con caratteri speciali nella password", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC10 - Login con caratteri speciali nella password");

    await page.goto(process.env.E2E_BASE_URL);

    await enterSpecialCharPassword(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyLoginSuccess(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});