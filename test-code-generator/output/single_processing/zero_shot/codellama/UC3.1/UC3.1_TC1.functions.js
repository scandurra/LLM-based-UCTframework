// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const CensusSheetPage = require("../../models/page_object_models/census_sheet_page.js");

async function step1_AccediAllaSezioneDiVisualizzazioneDelleSchedeCensimento(loginPage, sidebarPage, censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Accedi alla sezione di visualizzazione delle schede censimento
    await loginPage.clickLoginLink();
    await loginPage.fillEmail("test@example.com");
    await loginPage.fillPassword("password");
    await loginPage.clickLoginButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the census sheet page is visible after login
    await expect(censusSheetPage.pageSelector).toBeVisible();
}

async function step2_SelezionaColonnaPerLOrdinamentoECliccaSulNomeDellaColonna(censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Seleziona una colonna per l'ordinamento e clicca sul nome della colonna
    await censusSheetPage.clickColumnHeader("Nome");
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona una colonna per l\'ordinamento e clicca sul nome della colonna', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the rows are sorted by name after clicking on the column header
    await expect(censusSheetPage.rows).toHaveText([
        "Nome",
        "Cognome",
        "Luogo di nascita"
    ]);
}

async function step3_ScorriLateralmentePerVisualizzareTutteLeColonne(censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Scorri lateralmente per visualizzare tutte le colonne
    await censusSheetPage.scrollToColumn("Luogo di nascita");
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID3', 'Scorri lateralmente per visualizzare tutte le colonne', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that all columns are visible after scrolling
    await expect(censusSheetPage.columns).toHaveText([
        "Nome",
        "Cognome",
        "Luogo di nascita"
    ]);
}