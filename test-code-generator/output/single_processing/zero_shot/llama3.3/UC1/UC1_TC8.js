const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const insertDisabledAccountCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC8_ID1', 'Insert disabled account credentials', 'Account disabilitato rilevato', 'Account disabilitato rilevato', true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, E2E_LOGIN_PASSWORD_ADMIN: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
    }

    expect(await loginPage.emailInput.inputValue()).toBe(process.env.E2E_LOGIN_EMAIL_ADMIN);
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC8_ID2', 'Click Login button', 'Messaggio di errore visualizzato', 'Messaggio di errore visualizzato', true, '', executionTime);
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
        reporter.addStep('UC1_TC8_ID3', 'Verify error message', 'Messaggio di errore visualizzato', errorMessage, true, '', executionTime);
    }

    expect(errorMessage).toContain('Account disabilitato');
}

test("UC1_TC8 - Login con account disabilitato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC8 - Login con account disabilitato");

    await insertDisabledAccountCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});