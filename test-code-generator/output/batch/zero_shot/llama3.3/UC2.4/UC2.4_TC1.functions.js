import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

export const selectMultipleCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.selectCity(0);
    await dashboardPage.selectCity(1);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID1', 'Seleziona due o più comuni dal menù a tendina', true, await dashboardPage.isCitySelectorVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isCitySelectorVisible()).toBeTruthy();
}

export const selectValidKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.selectKPI();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID2', 'Scegli un KPI valido per il confronto', true, await dashboardPage.isKPISelectorVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isKPISelectorVisible()).toBeTruthy();
}

export const confirmRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageBenchmarkingKpi(page);
    await dashboardPage.applyKPIAndVerify();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID3', 'Conferma la richiesta cliccando sul pulsante', true, await dashboardPage.verifyKPIResults(), true, {}, executionTime);
    }

    expect(await dashboardPage.verifyKPIResults()).toBeTruthy();
}