const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC1_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC1/UC1_TC1.spec.js');

const accessPlatformAsUnregisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_BASE_URL);

    const homePage = new HomePage(page);
    const isHomePageVisible = await page.url() === process.env.E2E_HOME_URL;

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC2_ID1', 'Accedi alla piattaforma come utente non registrato', true, isHomePageVisible, isHomePageVisible, '', executionTime);
    }

    expect(isHomePageVisible).toBeTruthy();
}

const tryToAccessDashboardDirectly = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_DASHBOARD_URL);

    const isLoginRequired = await page.url() === process.env.E2E_LOGIN_URL;

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2_TC2_ID2', 'Tenta di accedere direttamente alla dashboard tramite URL', true, isLoginRequired, isLoginRequired, '', executionTime);
    }

    expect(isLoginRequired).toBeTruthy();
}

test("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione");

    await fillCorrectCredentials(page, null);
    await clickLoginButton(page, null);

    await accessPlatformAsUnregisteredUser(page, reporter);
    await tryToAccessDashboardDirectly(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});