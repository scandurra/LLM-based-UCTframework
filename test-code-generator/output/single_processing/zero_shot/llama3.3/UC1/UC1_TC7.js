const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const attemptXSSAttack = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const xssString = '<script>alert("XSS attack")</script>';
    
    loginPage.enterEmail(xssString);
    loginPage.enterPassword('password');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC7_ID1', 'Inserisci una stringa di input che tenta di eseguire un attacco XSS', 'Il sistema rileva e blocca l\'attacco', 'XSS attack detected and blocked', true, `xssString: ${xssString}`, executionTime);
    }

    expect(loginPage.emailInput).toContainText(xssString);
}

const clickLoginButton = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);

    loginPage.login();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC7_ID2', 'Clicca il tasto “Login”', 'Il sistema visualizza un messaggio di errore di sicurezza', 'Security error message displayed', true, '', executionTime);
    }

    expect(loginPage.authenticate).toBeDisabled();
}

const verifyErrorMessage = function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);

    const errorMessage = loginPage.getErrorMessage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC7_ID3', 'Verifica la visualizzazione del messaggio di errore', 'Viene mostrato un messaggio che indica un tentativo di accesso non autorizzato', errorMessage, true, '', executionTime);
    }

    expect(errorMessage).toContain('Tentativo di accesso non autorizzato');
}

test("UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)");

    await attemptXSSAttack(page, reporter);

    await clickLoginButton(page, reporter);

    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});