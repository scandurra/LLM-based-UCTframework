const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

// Step 1
const insertDefaultCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_LOGIN_URL);
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    await loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID1', 'Insert default credentials', 'System requires password change', 'System requires password change', true, { username: process.env.E2E_LOGIN_EMAIL_ADMIN, password: process.env.E2E_LOGIN_PASSWORD_ADMIN }, executionTime);
    }

    await expect(loginPage.errorMessage).toContainText('Password change required');
}

// Step 2
const insertNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const newPassword = 'NewPassword123!';
    await loginPage.enterPassword(newPassword);
    await loginPage.enterPassword(newPassword); // confirm password
    await loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID2', 'Insert new password', 'Password is accepted and changed', 'Password is accepted and changed', true, { newPassword: newPassword }, executionTime);
    }

    await expect(loginPage.errorMessage).not.toContainText('Invalid password');
}

// Step 3
const verifyNewPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_LOGIN_URL);
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword('NewPassword123!');
    await loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID3', 'Verify new password', 'System allows access with new password', 'System allows access with new password', true, { username: process.env.E2E_LOGIN_EMAIL_ADMIN, password: 'NewPassword123!' }, executionTime);
    }

    await expect(loginPage.errorMessage).not.toContainText('Invalid credentials');
}

test("UC1_TC5 - Cambio password alla prima autenticazione", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC5 - Cambio password alla prima autenticazione");

    await insertDefaultCredentials(page, reporter);
    await insertNewPassword(page, reporter);
    await verifyNewPassword(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});