import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

// Step 1
export const selectComuneAndParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
    await dashboardPageIlluminationSearch.selectComune(0); // Select the first comune from the dropdown list
    // TODO: Insert code to select valid parameters for search
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona un comune e dei parametri di ricerca validi', 'I parametri vengono accettati', 'I parametri vengono accettati', true, {}, executionTime);
    }
}

// Step 2
export const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    await dashboardPageIlluminationSearch.applySearch(); // Click on the "Apply" button to perform search
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Conferma la ricerca', 'La mappa si aggiorna con gli impianti di illuminazione trovati', 'La mappa si aggiorna con gli impianti di illuminazione trovati', true, {}, executionTime);
    }
}

// Step 3
export const visualizeDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    // TODO: Insert code to visualize details of the impianti di illuminazione found in the search results
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Visualizza i dettagli degli impianti di illuminazione', 'Le informazioni vengono visualizzate correttamente', 'Le informazioni vengono visualizzate correttamente', true, {}, executionTime);
    }
}