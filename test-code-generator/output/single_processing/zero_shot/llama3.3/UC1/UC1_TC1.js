const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const navigateToLoginPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_LOGIN_URL);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Navigate to login page', 'Login page loaded', 'Login page loaded', true, `E2E_LOGIN_URL: ${process.env.E2E_LOGIN_URL}`, executionTime);
    }

    await expect(page).toHaveURL(process.env.E2E_LOGIN_URL);
}

const insertCorrectCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Insert correct credentials', 'Credentials accepted', 'Credentials accepted', true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, E2E_LOGIN_PASSWORD_ADMIN: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
    }

    await expect(loginPage.emailInput).toHaveValue(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await expect(loginPage.passwordInput).toHaveValue(process.env.E2E_LOGIN_PASSWORD_ADMIN);
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Click login button', 'System proceeds with authentication', 'System proceeds with authentication', true, '', executionTime);
    }

    await expect(loginPage.authenticate).toBeDisabled();
}

const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const message = await loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID4', 'Verify success message', 'Success message displayed', message, message !== null, '', executionTime);
    }

    await expect(message).not.toBeNull();
}

test("UC1_TC1 - Login test with success", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1 - Login test with success");

    await navigateToLoginPage(page, reporter);
    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});