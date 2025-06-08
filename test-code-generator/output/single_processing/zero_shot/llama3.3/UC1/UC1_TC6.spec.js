const { test, expect } = require('@playwright/test');
const LoginPage = require('../../models/page_object_models/login-page');
const TestResultReporter = require('../../models/test-result-reporter');

const injectSqlInUsernameField = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await expect(loginPage.isEmailFieldVisible()).toBeTruthy();
    await loginPage.fillEmail("Robert'); DROP TABLE Students; --");
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC6_ID1', 'Inserisci una stringa di testo che simula un attacco di SQL injection nel campo username', true, await loginPage.isEmailFieldVisible(), true, "SQL Injection String", executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginButton();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC6_ID2', 'Clicca il tasto “Login”', true, true, true, "", executionTime);
    }

    expect(await page.url()).not.toContain(process.env.E2E_DASHBOARD_URL);
}

const verifySystemIntegrity = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.clickLoginLink();
    await expect(loginPage.isEmailFieldVisible()).toBeTruthy();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC6_ID3', 'Verifica che il sistema non abbia subito danni', true, await loginPage.isEmailFieldVisible(), true, "", executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

test("UC1_TC6 - Tentativo di SQL injection nel campo username", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC6 - Tentativo di SQL injection nel campo username");

    await injectSqlInUsernameField(page, reporter);
    await clickLoginButton(page, reporter);
    await verifySystemIntegrity(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});