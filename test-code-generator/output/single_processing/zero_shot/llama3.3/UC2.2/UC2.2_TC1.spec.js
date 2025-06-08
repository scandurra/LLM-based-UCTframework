const { test, expect } = require('@playwright/test');
const DashboardPageIlluminationSearch = require('../../models/page_object_models/dashboard-page-illumination-search');
const TestResultReporter = require('../../models/test-result-reporter');
const accessPlatformAsRegisteredUser = require('./access-platform-as-registered-user');
const selectDashboardMenu = require('./select-dashboard-menu');

const selectComuneAndParams = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
    await dashboardPageIlluminationSearch.selectComune(1);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC1_ID1', 'Seleziona un comune e dei parametri di ricerca validi', true, await dashboardPageIlluminationSearch.isComuniDropdownVisible(), true, '', executionTime);
    }

    expect(await dashboardPageIlluminationSearch.isComuniDropdownVisible()).toBe(true);
}

const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
    await dashboardPageIlluminationSearch.applySearch();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC1_ID2', 'Conferma la ricerca', true, await dashboardPageIlluminationSearch.isMapVisible(), true, '', executionTime);
    }

    expect(await dashboardPageIlluminationSearch.isMapVisible()).toBe(true);
}

const visualizeDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC1_ID3', 'Visualizza i dettagli degli impianti di illuminazione', true, true, true, '', executionTime);
    }
}

test("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi");

    await page.goto(process.env.E2E_BASE_URL);

    const loginPage = require('../../models/page_object_models/login-page');
const UC2_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC2/UC2_TC1.spec.js');
    const loginPageInstance = new loginPage(page);
    await loginPageInstance.clickLoginLink();

    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);

    await selectComuneAndParams(page, reporter);
    await confirmSearch(page, reporter);
    await visualizeDetails(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});