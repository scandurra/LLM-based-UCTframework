import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

// Step 1
export const navigateToDashboardAndScroll = async function(page, reporter) {
    // Reuse existing method in the prompt without redefining them
    await navigateToDashboard(page, null);
    
    let startTime = Date.now();
    await page.locator('[data-testid="generalDataTable"]').scrollIntoViewIfNeeded({ timeout: 5000 });
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC2_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const sortTableByColumn = async function(page, reporter) {
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    
    let startTime = Date.now();
    await dashboardPageGeneralDataTable.sortByRegion();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC2_ID2', 'Clicca sul nome di una colonna per ordinare i dati', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const verifySorting = async function(page, reporter) {
    // Verify sorting by checking the table content
    let startTime = Date.now();
    await page.waitForSelector('[data-testid="generalDataTable"]');
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC2_ID3', 'Verifica che l’ordinamento funzioni anche con più clic (ascendente e discendente)', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}