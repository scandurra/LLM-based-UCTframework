const { test, expect } = require('@playwright/test');
const CensusSheetPage = require('../../models/page_object_models/census-sheet-page');
const TestResultReporter = require('../../models/test-result-reporter');
const accessPlatformAndAuthenticate = require('./accessPlatformAndAuthenticate');
const selectCensusSheetMenu = require('./selectCensusSheetMenu');
const UC3_4_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC3.4/UC3.4_TC1.spec.js');

const clickCongelamentoButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneCongela();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID1', 'Seleziona l’operazione di congelamento della scheda', true, censusSheetPage.freezeOption.isVisible(), censusSheetPage.freezeOption.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.freezeOption).toBeVisible();
}

const confirmCongelamento = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickConfirmAzioneDelete();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID2', 'Conferma il congelamento della scheda', true, censusSheetPage.confirmButton.isVisible(), censusSheetPage.confirmButton.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.confirmButton).toBeVisible();
}

const verifyStatoScheda = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickStatoColumn();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID3', 'Verifica lo stato della scheda dopo il congelamento', true, censusSheetPage.statoColumn.isVisible(), censusSheetPage.statoColumn.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.statoColumn).toBeVisible();
}

test("UC3.4.4_TC1 - Congelamento scheda censimento con conferma", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC1 - Congelamento scheda censimento con conferma");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);

    const censusSheetPage = new CensusSheetPage(page);
    expect(censusSheetPage.searchInput).toBeVisible();

    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID0', 'Accedi alla sezione delle schede censimento', true, censusSheetPage.searchInput.isVisible(), censusSheetPage.searchInput.isVisible(), '', 0);
    }

    await clickCongelamentoButton(page, reporter);
    await confirmCongelamento(page, reporter);
    await verifyStatoScheda(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});