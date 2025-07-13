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
    if (!(await dashboardPageBenchmarkingKpi.isCitySelectorVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID1', 'Select cities', true, passFail, passFail, '', executionTime);
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
    if (!(await dashboardPageBenchmarkingKpi.isKPISelectorVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID2', 'Select KPI', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmRequestAndVerifyResults = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    const result = await dashboardPageBenchmarkingKpi.applyKPIAndVerify(5000);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!result) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.4_TC1_ID3', 'Confirm request and verify results', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}