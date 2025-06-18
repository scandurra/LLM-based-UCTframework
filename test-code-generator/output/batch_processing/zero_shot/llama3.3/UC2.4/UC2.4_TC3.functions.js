import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

export const selectMultipleCitiesWithInvalidKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.selectCity(0);
    await dashboardPage.selectCity(1);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC3_ID1', 'Seleziona due o più comuni dal menù a tendina con KPI non valido', true, await dashboardPage.isCitySelectorVisible(), false, {}, executionTime);
    }

    expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectInvalidKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    // Simulate selecting an invalid KPI
    await dashboardPage.selectKPI();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC3_ID2', 'Scegli un KPI non disponibile o non valido per il confronto', false, await dashboardPage.isKPISelectorVisible(), false, {}, executionTime);
    }

    expect(await dashboardPage.isKPISelectorVisible()).toBeFalsy();
}

export const tryToConfirmRequestWithInvalidKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.applyKPIAndVerify();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC3_ID3', 'Tenta di confermare la richiesta cliccando sul pulsante con KPI non valido', false, await dashboardPage.verifyKPIResults(), false, {}, executionTime);
    }

    expect(await dashboardPage.verifyKPIResults()).toBeFalsy();
}