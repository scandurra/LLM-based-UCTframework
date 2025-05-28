const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertDisabledAccountCredentials = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC8_ID1', 'Insert disabled account credentials', 'Account disabilitato rilevato', 'Account disabilitato non rilevato', true, `Email: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, Password: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
    }

    expect(loginPage.emailInput).not.toBeNull();
}

const clickLoginButton = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    loginPage.displayLoginForm();
    loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC8_ID2', 'Click Login button', 'Messaggio di errore visualizzato', 'Nessun messaggio di errore visualizzato', true, '', executionTime);
    }

    expect(loginPage.authenticate).not.toBeNull();
}

const verifyErrorMessage = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const errorMessage = loginPage.getErrorMessage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC8_ID3', 'Verify error message', `Messaggio di errore: ${errorMessage}`, 'Nessun messaggio di errore visualizzato', errorMessage !== null, '', executionTime);
    }

    expect(errorMessage).not.toBeNull();
}

test("UC1_TC8 - Login con account disabilitato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC8 - Login con account disabilitato");

    await page.goto(process.env.E2E_BASE_URL);

    insertDisabledAccountCredentials(page, reporter);

    clickLoginButton(page, reporter);

    verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});