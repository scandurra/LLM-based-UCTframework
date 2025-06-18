import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

// Step 1
export const selectComuneAndValidParameters = async function(page, reporter) {
    const startTime = Date.now();
    const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);

    await dashboardPageIlluminationSearch.selectComune(0); // Select the first comune from the list
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona un comune e dei parametri di ricerca validi', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const applySearch = async function(page, reporter) {
    const startTime = Date.now();
    const dashboardPageIlluminationSearch = new DashboardPageIlluminationSearch(page);

    await dashboardPageIlluminationSearch.applySearch(); // Click on the "Apply" button to apply the search
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Conferma la ricerca', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const visualizeDetails = async function(page, reporter) {
    const startTime = Date.now();
    // TODO: Add code to visualize details of the impianti di illuminazione found in step 2
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Visualizza i dettagli degli impianti di illuminazione', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}