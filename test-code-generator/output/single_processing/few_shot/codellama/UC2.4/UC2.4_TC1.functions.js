import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const selectCommunes = async function(page, reporter) {
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    
    let startTime = Date.now();
    await dashboardPageBenchmarkingKpi.selectCity(21);  // Select the first city in the list
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const selectKPI = async function(page, reporter) {
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    
    let startTime = Date.now();
    await dashboardPageBenchmarkingKpi.selectKPI();  // Select the first KPI in the list
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Scegli un KPI valido per il confronto', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const confirmRequest = async function(page, reporter) {
    // TODO: Implement this step
}