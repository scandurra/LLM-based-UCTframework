const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const attemptSQLInjection = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await loginPage.displayLoginForm();
    await loginPage.enterEmail("test.admin@pell.it'); DROP TABLE users; --");
    await loginPage.enterPassword("Testadmin01!");
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC6_ID1', 'Inserisci una stringa di input che tenta di eseguire un attacco SQL Injection', "Il sistema rileva e blocca l\'attacco", "SQL injection attempt blocked", true, "E2E_LOGIN_EMAIL_ADMIN", executionTime);
    }

    expect(await loginPage.getErrorMessage()).not.toBeNull();
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC6_ID2', 'Clicca il tasto “Login”', "Il sistema visualizza un messaggio di errore di sicurezza", "Security error message displayed", true, "", executionTime);
    }

    expect(await loginPage.getErrorMessage()).not.toBeNull();
}

const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    const errorMessage = await loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC6_ID3', 'Verifica la visualizzazione del messaggio di errore', "Viene mostrato un messaggio che indica un tentativo di accesso non autorizzato", errorMessage, true, "", executionTime);
    }

    expect(errorMessage).toContain("accesso non autorizzato");
}

test("UC1_TC6 - Tentativo di login con SQL Injection", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC6 - Tentativo di login con SQL Injection");

    await attemptSQLInjection(page, reporter);

    await clickLoginButton(page, reporter);

    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});