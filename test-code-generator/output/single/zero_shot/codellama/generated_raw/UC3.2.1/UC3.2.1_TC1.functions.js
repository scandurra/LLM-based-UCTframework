const { DateTime } = require('luxon');
const TestResultReporter = require("../../models/test-result-reporter.js");
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const CensusSheetPage = require("../../models/page_object_models/census_sheet_page.js");

// Function to insert a valid name in the search bar
async function step1_InserisciUnNomeValidoNellaBarraDiRicerca(censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Insert a valid name in the search bar
    await censusSheetPage.insertName("John Doe");
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Inserisci un nome valido nella barra di ricerca', true, true, true, null, executionTime);
    }
}

// Function to confirm the search
async function step2_ConfermaLaRicerca(censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Click on the Search button
    await censusSheetPage.clickSearchButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Conferma la ricerca', true, true, true, null, executionTime);
    }
}

// Function to view the details of census sheets found
async function step3_VisualizzaIDettagliDelleSchedeCensimentoTrovate(censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Click on the Details button for each result
    await censusSheetPage.clickDetailsButtonForAllResults();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID3', 'Visualizza i dettagli delle schede censimento trovate', true, true, true, null, executionTime);
    }
}