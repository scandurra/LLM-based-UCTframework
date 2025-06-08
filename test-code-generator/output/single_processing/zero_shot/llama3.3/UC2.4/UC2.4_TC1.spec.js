const { test, expect } = require('@playwright/test');
const DashboardPageBenchmarkingKpi = require('../../models/page_object_models/dashboard-page-benchmarking-kpi');
const TestResultReporter = require('../../models/test-result-reporter');

const selectCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.selectCity(0);
    await dashboardPage.selectCity(1);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', true, await dashboardPage.isCitySelectorVisible(), true, '', executionTime);
    }

    expect(await dashboardPage.isCitySelectorVisible()).toBe(true);
}

const selectKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.selectKPI();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID2', 'Scegli un KPI valido per il confronto', true, await dashboardPage.isKPISelectorVisible(), true, '', executionTime);
    }

    expect(await dashboardPage.isKPISelectorVisible()).toBe(true);
}

const confirmRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.applyKPIAndVerify();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', true, await dashboardPage.verifyKPIResults(), true, '', executionTime);
    }

    expect(await dashboardPage.verifyKPIResults()).toBe(true);
}

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking");

    await page.goto(process.env.E2E_BASE_URL);

    const loginPage = require('../../models/page_object_models/login-page');
    const sidebarPage = require('../../models/page_object_models/sidebar-page');
const UC2_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC2/UC2_TC1.spec.js');

    await accessPlatformAsRegisteredUser(page, null);
    await selectDashboardMenu(page, null);

    await selectCities(page, reporter);
    await selectKPI(page, reporter);
    await confirmRequest(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});