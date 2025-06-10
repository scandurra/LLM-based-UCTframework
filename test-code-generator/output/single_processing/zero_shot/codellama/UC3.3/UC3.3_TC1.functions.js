// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const CensusSheetPage = require("../../models/page_object_models/census_sheet_page.js");
const CensusSheetUploadPage = require("../../models/page_object_models/census_sheet_upload_page.js");

async function step1_AccediAllaPiattaformaEAutenticaCorrettamente(loginPage, sidebarPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Accedi alla piattaforma e autenticati correttamente
    await loginPage.clickLoginLink();
    await loginPage.fillEmail("test@example.com");
    await loginPage.fillPassword("password");
    await loginPage.clickLoginButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autenticati correttamente', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the sidebar is visible after login
    await expect(sidebarPage.sidebarSelector).toBeVisible();
}

async function step2_SelezionaVoceDelMenuLateraleRelativaAlleSchedeCensimento(sidebarPage, censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Seleziona la voce del menù laterale relativa alle schede censimento
    await sidebarPage.clickCensusSheetsLink();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the census sheet page is visible after clicking on the sidebar link
    await expect(censusSheetPage.pageSelector).toBeVisible();
}

async function step3_CliccaSulTastoDiCaricamentoDelleSchedeCensimento(censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Clicca sul tasto di caricamento delle schede censimento
    await censusSheetPage.clickUploadButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID3', 'Clicca sul tasto di caricamento delle schede censimento', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the upload page is visible after clicking on the upload button
    await expect(censusSheetUploadPage.pageSelector).toBeVisible();
}

async function step4_SelezionaUnFileInFormatoSupportatoECompilaIParametriRichiesti(censusSheetUploadPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 4 implementation: Seleziona un file in formato supportato (es. PDF) e compila i parametri richiesti
    await censusSheetUploadPage.selectFile("path/to/file");
    await censusSheetUploadPage.fillParameters(parameters);
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID4', 'Seleziona un file in formato supportato e compila i parametri richiesti', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the upload page is still visible after selecting a file and filling parameters
    await expect(censusSheetUploadPage.pageSelector).toBeVisible();
}

async function step5_ProcediAlCaricamentoDelFile(censusSheetUploadPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 5 implementation: Procedi all'upload del file
    await censusSheetUploadPage.clickUploadButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID5', 'Procedi all\'upload del file', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the upload page is still visible after clicking on the upload button
    await expect(censusSheetUploadPage.pageSelector).toBeVisible();
}