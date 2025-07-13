import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

export const searchForCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    // Simulate searching for cities
    await dashboardPage.selectCity(0);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC5_ID1', 'Utilizza la funzione di ricerca per trovare i comuni desiderati', true, await dashboardPage.isCitySelectorVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectKPIUsingFilter = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    // Simulate selecting KPI using filter
    await dashboardPage.selectKPI();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC5_ID2', 'Seleziona il KPI desiderato tramite la funzione di filtro o ricerca', true, await dashboardPage.isKPISelectorVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequestWithSearchAndFilter = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.applyKPIAndVerify();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC5_ID3', 'Conferma la richiesta cliccando sul pulsante con ricerca e filtro', true, await dashboardPage.verifyKPIResults(), true, {}, executionTime);
    }

    expect(await dashboardPage.verifyKPIResults()).toBeTruthy();
}