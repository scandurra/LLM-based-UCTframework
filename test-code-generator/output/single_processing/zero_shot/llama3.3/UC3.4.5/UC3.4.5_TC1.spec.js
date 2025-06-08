const { test, expect } = require('@playwright/test');
const CensusSheetPage = require('../../models/page_object_models/census-sheet-page');
const TestResultReporter = require('../../models/test-result-reporter');
const accessPlatformAndAuthenticate = require('./accessPlatformAndAuthenticate');
const selectCensusSheetMenu = require('./selectCensusSheetMenu');
const UC3_4_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC3.4/UC3.4_TC1.spec.js');

const clickDettaglioButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID1', 'Seleziona l\'operazione di dettaglio su una scheda esistente', true, censusSheetPage.detailOption.isVisible(), censusSheetPage.detailOption.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.detailOption).toBeVisible();
}

const verifyDettaglioPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.page.waitForLoadState('networkidle');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID2', 'Verifica la presenza dei dati generali dell\'area e della gerarchia dei POD e Aree Omogenee', true, censusSheetPage.page.url().includes('/dettaglio'), censusSheetPage.page.url().includes('/dettaglio'), '', executionTime);
    }

    expect(censusSheetPage.page.url()).toContain('/dettaglio');
}

const navigateGerarchia = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.page.click('.pod-link');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID3', 'Prova a navigare nella gerarchia dei POD e Aree Omogenee', true, censusSheetPage.page.url().includes('/pod'), censusSheetPage.page.url().includes('/pod'), '', executionTime);
    }

    expect(censusSheetPage.page.url()).toContain('/pod');
}

test("UC3.4.5_TC1 - Visualizzazione dettaglio scheda censimento con dati validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC1 - Visualizzazione dettaglio scheda censimento con dati validi");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);

    const censusSheetPage = new CensusSheetPage(page);
    expect(censusSheetPage.searchInput).toBeVisible();

    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID0', 'Accedi alla sezione delle schede censimento', true, censusSheetPage.searchInput.isVisible(), censusSheetPage.searchInput.isVisible(), '', 0);
    }

    await clickAzioniButton(page, reporter);
    await clickDettaglioButton(page, reporter);
    await verifyDettaglioPage(page, reporter);
    await navigateGerarchia(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});