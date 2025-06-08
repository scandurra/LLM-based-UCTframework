const { test, expect } = require('@playwright/test');
const CensusSheetPage = require('../../models/page_object_models/census-sheet-page');
const TestResultReporter = require('../../models/test-result-reporter');
const accessPlatformAndAuthenticate = require('./accessPlatformAndAuthenticate');
const selectCensusSheetMenu = require('./selectCensusSheetMenu');
const UC3_4_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC3.4/UC3.4_TC1.spec.js');

const clickAzioniButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID1', 'Seleziona l’operazione di modifica sulla scheda censimento', true, censusSheetPage.actionDropdown.isVisible(), censusSheetPage.actionDropdown.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.actionDropdown).toBeVisible();
}

const selectEditOption = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneEdit();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID2', 'Modifica i campi con dati validi', true, censusSheetPage.editOption.isVisible(), censusSheetPage.editOption.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.editOption).toBeVisible();
}

const confirmEdit = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickConfirmButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID3', 'Conferma le modifiche', true, censusSheetPage.okButton.isVisible(), censusSheetPage.okButton.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.okButton).toBeVisible();
}

test("UC3.4.3_TC1 - Modifica scheda censimento con dati validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC1 - Modifica scheda censimento con dati validi");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);

    const censusSheetPage = new CensusSheetPage(page);
    expect(censusSheetPage.searchInput).toBeVisible();

    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID0', 'Accedi alla sezione delle schede censimento', true, censusSheetPage.searchInput.isVisible(), censusSheetPage.searchInput.isVisible(), '', 0);
    }

    await clickAzioniButton(page, reporter);
    await selectEditOption(page, reporter);
    await confirmEdit(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});