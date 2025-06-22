import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

// Step 1
export const selectCommunes = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    await dashboardPageBenchmarkingKpi.selectCity(21); // Select the first 21 cities from the list
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', 'I comuni vengono selezionati correttamente', 'I comuni vengono selezionati correttamente', true, {}, executionTime);
    }
}

// Step 2
export const selectKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    await dashboardPageBenchmarkingKpi.selectKPI(); // Select the first KPI from the list
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Scegli un KPI valido per il confronto', 'Il KPI viene accettato', 'Il KPI viene accettato', true, {}, executionTime);
    }
}

// Step 3
export const confirmRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    await dashboardPageBenchmarkingKpi.applyKPIAndVerify(); // Click on the button and wait for results to appear
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', 'Il grafico con il confronto desiderato viene visualizzato', 'Il grafico con il confronto desiderato viene visualizzato', true, {}, executionTime);
    }
}