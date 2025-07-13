const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const DashboardPageIlluminationSearch = require("../../models/page_object_models/dashboard_page_illumination_search.js");

async function step1_SelezionaUnComuneEDeiParametriDiRicercaValidi(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Seleziona un comune e dei parametri di ricerca validi
    await DashboardPageIlluminationSearch.selectComune(0);
    await DashboardPageIlluminationSearch.applySearch();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona un comune e dei parametri di ricerca validi', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the map is visible and enabled
    await expect(DashboardPageIlluminationSearch.mapText).toBeVisible();
}

async function step2_ConfermaLaRicerca(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Conferma la ricerca
    await DashboardPageIlluminationSearch.applySearch();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Conferma la ricerca', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the map is visible and enabled
    await expect(DashboardPageIlluminationSearch.mapText).toBeVisible();
}

async function step3_VisualizzaIContenutiGliImpiantiDiIlluminazione(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Visualizza i dettagli degli impianti di illuminazione
    await DashboardPageIlluminationSearch.applySearch();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Visualizza i dettagli degli impianti di illuminazione', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the map is visible and enabled
    await expect(DashboardPageIlluminationSearch.mapText).toBeVisible();
}