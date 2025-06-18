import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

export const selectSingleCity = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.selectCity(0);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC2_ID1', 'Seleziona un solo comune dal menù a tendina', true, await dashboardPage.isCitySelectorVisible(), false, {}, executionTime);
    }

    expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectValidKPIWithoutMultipleCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.selectKPI();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC2_ID2', 'Scegli un KPI valido per il confronto senza selezionare più comuni', false, await dashboardPage.isKPISelectorVisible(), false, {}, executionTime);
    }

    expect(await dashboardPage.isKPISelectorVisible()).toBeFalsy();
}

export const tryToConfirmRequestWithoutMultipleCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.applyKPIAndVerify();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC2_ID3', 'Tenta di confermare la richiesta cliccando sul pulsante senza selezionare più comuni', false, await dashboardPage.verifyKPIResults(), false, {}, executionTime);
    }

    expect(await dashboardPage.verifyKPIResults()).toBeFalsy();
}