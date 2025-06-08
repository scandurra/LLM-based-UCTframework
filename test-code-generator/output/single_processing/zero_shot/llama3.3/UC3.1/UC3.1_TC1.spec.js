const { test, expect } = require('@playwright/test');
const CensusSheetPage = require('../../models/page_object_models/census-sheet-page');
const TestResultReporter = require('../../models/test-result-reporter');
const UC1_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC1/UC1_TC1.spec.js');
const UC3_TC1 = require('../.././output/single_processing/zero_shot/llama3.3/UC3/UC3_TC1.spec.js');

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

const accessCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, reporter);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento', true, page.url() === process.env.E2E_CTS_URL, page.url() === process.env.E2E_CTS_URL, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_CTS_URL);
}

const selectColumnForSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniColumn();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID2', 'Seleziona una colonna per l’ordinamento e clicca sul nome della colonna', true, await censusSheetPage.page.url() === process.env.E2E_CTS_URL, await censusSheetPage.page.url() === process.env.E2E_CTS_URL, '', executionTime);
    }

    expect(await censusSheetPage.page.url()).toBe(process.env.E2E_CTS_URL);
}

const scrollHorizontally = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.page.evaluate(() => {
        window.scrollTo({ left: 1000, behavior: 'smooth' });
    });

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID3', 'Scorri lateralmente per visualizzare tutte le colonne', true, await censusSheetPage.page.url() === process.env.E2E_CTS_URL, await censusSheetPage.page.url() === process.env.E2E_CTS_URL, '', executionTime);
    }

    expect(await censusSheetPage.page.url()).toBe(process.env.E2E_CTS_URL);
}

test("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await selectColumnForSorting(page, reporter);
    await scrollHorizontally(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});