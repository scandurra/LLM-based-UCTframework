import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

export const selectMaximumNumberOfCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    for (let i = 0; i < 10; i++) { // Assuming the maximum number of cities is 10
        await dashboardPage.selectCity(i);
    }

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC4_ID1', 'Seleziona il massimo numero di comuni possibile dal menù a tendina', true, await dashboardPage.isCitySelectorVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectValidKPIWithMaximumCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.selectKPI();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC4_ID2', 'Scegli un KPI valido per il confronto con il massimo numero di comuni', true, await dashboardPage.isKPISelectorVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequestWithMaximumCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.applyKPIAndVerify();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC4_ID3', 'Conferma la richiesta cliccando sul pulsante con il massimo numero di comuni', true, await dashboardPage.verifyKPIResults(), true, {}, executionTime);
    }

    expect(await dashboardPage.verifyKPIResults()).toBeTruthy();
}