const { test, expect } = require('@playwright/test');
const DashboardPage = require('../../models/page_object_models/dashboard-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC2_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC2/UC2_TC1.spec.js');

const accessDashboardSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectDashboardMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID1', 'Accedi alla sezione dashboard tramite il menù apposito', true, page.url() === process.env.E2E_DASHBOARD_URL, true, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

const scrollAndVerifyTabellaDatiGenerali = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isTabellaDatiGeneraliShown();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID2', 'Scorri nella pagina fino a visualizzare la sezione tabellare dedicata ai dati generali', true, await dashboardPage.isTabellaDatiGeneraliShown(), true, '', executionTime);
    }

    expect(await dashboardPage.isTabellaDatiGeneraliShown()).toBe(true);
}

const verifyComuniScrollingAndPagination = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.selectComuneForImpianti(1);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID3', 'Verifica che sia possibile scorrere tra i comuni disponibili e modificare gli elementi visualizzati per pagina', true, await dashboardPage.isImpiantiVisible(), true, '', executionTime);
    }

    expect(await dashboardPage.isImpiantiVisible()).toBe(true);
}

test("UC2.3_TC1 - Visualizzazione tabella dati generali con impostazioni predefinite", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.3_TC1 - Visualizzazione tabella dati generali con impostazioni predefinite");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAsRegisteredUser(page, null);
    await accessDashboardSection(page, reporter);
    await scrollAndVerifyTabellaDatiGenerali(page, reporter);
    await verifyComuniScrollingAndPagination(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});