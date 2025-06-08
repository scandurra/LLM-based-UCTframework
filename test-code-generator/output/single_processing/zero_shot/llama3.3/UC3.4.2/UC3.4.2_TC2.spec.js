const { test, expect } = require('@playwright/test');
const CensusSheetPage = require('../../models/page_object_models/census-sheet-page');
const TestResultReporter = require('../../models/test-result-reporter');
const accessPlatformAndAuthenticate = require('./accessPlatformAndAuthenticate');
const selectCensusSheetMenu = require('./selectCensusSheetMenu');
const UC3_4_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC3.4/UC3.4_TC1.spec.js');

const clickAzioneDelete = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneDelete();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID1', 'Seleziona l\'operazione di cancellazione di una scheda censimento esistente', true, censusSheetPage.cancelDeleteButton.isVisible(), censusSheetPage.cancelDeleteButton.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.cancelDeleteButton).toBeVisible();
}

const clickCancelAzioneDelete = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickCancelAzioneDelete();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID2', 'Annulla l\'eliminazione della scheda indicata', true, censusSheetPage.actionDropdown.isVisible(), censusSheetPage.actionDropdown.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.actionDropdown).toBeVisible();
}

test("UC3.4.2_TC2 - Annullamento eliminazione scheda censimento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC2 - Annullamento eliminazione scheda censimento");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);

    const censusSheetPage = new CensusSheetPage(page);
    expect(censusSheetPage.searchInput).toBeVisible();

    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID0', 'Accedi alla sezione delle schede censimento', true, censusSheetPage.searchInput.isVisible(), censusSheetPage.searchInput.isVisible(), '', 0);
    }

    await clickAzioneDelete(page, reporter);

    await clickCancelAzioneDelete(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});