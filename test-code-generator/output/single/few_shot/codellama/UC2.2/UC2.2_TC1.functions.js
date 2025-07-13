import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

// Step 1
export const selectComuneAndParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
    await dashboardPageIlluminationSearch.selectComune(0); // Select the first comune from the dropdown list
    let endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona un comune e dei parametri di ricerca validi', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const applySearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);
    await dashboardPageIlluminationSearch.applySearch(); // Click on the "Apply" button to apply the search
    let endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Conferma la ricerca', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const viewDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    // TODO: Implement the step to visualize details of illumination plants
    let endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Visualizza i dettagli degli impianti di illuminazione', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}