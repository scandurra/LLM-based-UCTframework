import { test, expect } from '@playwright/test';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectCities = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    await dashboardPageBenchmarkingKpi.selectCity(0);
    await dashboardPageBenchmarkingKpi.selectCity(1);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        expect(await dashboardPageBenchmarkingKpi.isCitySelectorVisible()).toBeTruthy();
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID1', 'Select two or more cities from the dropdown menu', 'The cities are selected correctly', `Selected cities`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const selectKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    await dashboardPageBenchmarkingKpi.selectKPI();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        expect(await dashboardPageBenchmarkingKpi.isKPISelectorVisible()).toBeTruthy();
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID2', 'Choose a valid KPI for comparison', 'The KPI is accepted', `Selected KPI`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    await dashboardPageBenchmarkingKpi.applyKPIAndVerify();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        expect(await dashboardPageBenchmarkingKpi.verifyKPIResults()).toBeTruthy();
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID3', 'Confirm the request by clicking on the button', 'The chart with the desired comparison is displayed', `Displayed chart`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}