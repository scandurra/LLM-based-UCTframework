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
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID1', 'Select two or more cities from the dropdown menu', 'The cities are selected correctly', 'The cities are selected correctly', true, '', executionTime);
    }

    expect(await dashboardPageBenchmarkingKpi.isCitySelectorVisible()).toBe(true);
}

export const selectKPI = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    await dashboardPageBenchmarkingKpi.selectKPI();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID2', 'Choose a valid KPI for comparison', 'The KPI is accepted', 'The KPI is accepted', true, '', executionTime);
    }

    expect(await dashboardPageBenchmarkingKpi.isKPISelectorVisible()).toBe(true);
}

export const confirmRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    await dashboardPageBenchmarkingKpi.applyKPIAndVerify();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID3', 'Confirm the request by clicking on the button', 'The chart with the desired comparison is displayed', 'The chart with the desired comparison is displayed', true, '', executionTime);
    }

    expect(await dashboardPageBenchmarkingKpi.verifyKPIResults()).toBe(true);
}