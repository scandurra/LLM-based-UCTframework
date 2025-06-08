const { test, expect } = require('@playwright/test');
const CensusSheetPage = require('../../models/page_object_models/census-sheet-page');
const TestResultReporter = require('../../models/test-result-reporter');
const accessPlatformAndAuthenticate = require('./accessPlatformAndAuthenticate');
const selectCensusSheetMenu = require('./selectCensusSheetMenu');
const UC3_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC3/UC3_TC1.spec.js');

const clickAzioniButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4_TC1_ID2', 'Clicca sul tasto azioni di una scheda censimento', true, censusSheetPage.actionDropdown.isVisible(), censusSheetPage.actionDropdown.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.actionDropdown).toBeVisible();
}

test("UC3.4_TC1 - Visualizzazione azioni disponibili sulla scheda censimento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4_TC1 - Visualizzazione azioni disponibili sulla scheda censimento");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);

    const censusSheetPage = new CensusSheetPage(page);
    expect(censusSheetPage.searchInput).toBeVisible();

    if (reporter) {
        reporter.addStep('UC3.4_TC1_ID1', 'Accedi alla sezione delle schede censimento', true, censusSheetPage.searchInput.isVisible(), censusSheetPage.searchInput.isVisible(), '', 0);
    }

    await clickAzioniButton(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});