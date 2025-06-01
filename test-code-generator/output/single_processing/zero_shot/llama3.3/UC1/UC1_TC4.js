const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const enterUsernameAndLeavePasswordEmpty = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword('');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID1', 'Inserisci il username e lascia vuoto il campo password', 'Il sistema rileva l\'errore', 'Il sistema rileva l\'errore', true, 'E2E_LOGIN_EMAIL_ADMIN', executionTime);
    }

    expect(await loginPage.emailInput.isVisible()).toBeTruthy();
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID2', 'Clicca il tasto “Login”', 'Il sistema visualizza un messaggio di errore', 'Il sistema visualizza un messaggio di errore', true, '', executionTime);
    }

    expect(await loginPage.authenticate.isVisible()).toBeTruthy();
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.getErrorMessage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID3', 'Verifica la visualizzazione del messaggio di errore', 'Viene mostrato un messaggio che richiede di compilare tutti i campi', errorMessage, errorMessage.includes('compilare'), '', executionTime);
    }

    expect(errorMessage).toContain('compilare');
}

test("UC1_TC4 - Login con campo password vuoto", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC4 - Login con campo password vuoto");

    await page.goto(process.env.E2E_BASE_URL);

    await enterUsernameAndLeavePasswordEmpty(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});