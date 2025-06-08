const { test, expect } = require('@playwright/test');
const SidebarPage = require('../../models/page_object_models/sidebar-page');
const CensusSheetPage = require('../../models/page_object_models/census-sheet-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC1_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC1/UC1_TC1.spec.js');

const accessPlatformAndAuthenticate = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await fillCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autenticati correttamente', true, page.url() === process.env.E2E_HOME_URL, page.url() === process.env.E2E_HOME_URL, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

const selectCensusSheetMenu = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickCensusSheetLink();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', true, page.url() === process.env.E2E_CTS_URL, page.url() === process.env.E2E_CTS_URL, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_CTS_URL);
}

test("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});