const { test, expect } = require('@playwright/test');
const CensusSheetPage = require('../../models/page_object_models/census-sheet-page');
const CensusSheetPageUpload = require('../../models/page_object_models/census-sheet-page-upload');
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

const clickUploadButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.uploadButton.click();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID1', 'Clicca sul tasto di caricamento delle schede censimento', true, censusSheetPage.uploadButton.isVisible(), censusSheetPage.uploadButton.isVisible(), '', executionTime);
    }

    expect(censusSheetPage.uploadButton).toBeVisible();
}

const selectFileAndCompileParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    await censusSheetPageUpload.clickUploadSchedaModalButton();
    await censusSheetPageUpload.waitForUploadModal();
    const filePath = 'path_to_your_file.pdf'; // replace with your file path
    await censusSheetPageUpload.setInputFiles(filePath);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID2', 'Seleziona un file in formato supportato e compila i parametri richiesti', true, censusSheetPageUpload.fileInput.isVisible(), censusSheetPageUpload.fileInput.isVisible(), '', executionTime);
    }

    expect(censusSheetPageUpload.fileInput).toBeVisible();
}

const uploadFile = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadApplyButton();
    await censusSheetPageUpload.clickUploadApplyButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Procedi all’upload del file', true, page.url() === process.env.E2E_CTS_URL, page.url() === process.env.E2E_CTS_URL, '', executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_CTS_URL);
}

test("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato");

    await page.goto(process.env.E2E_BASE_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await clickUploadButton(page, reporter);
    await selectFileAndCompileParameters(page, reporter);
    await uploadFile(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});