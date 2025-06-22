import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

// Step 1
export const selectTwoOrMoreCommunes = async function(page, reporter) {
    // Reuse existing method in the prompt without redefining them
    await loginAsRegisteredUser(page, null);
}

// Step 2
export const chooseValidKPIForComparison = async function (page, reporter) {
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);

    let startTime = Date.now();
    await dashboardPageBenchmarkingKpi.selectCityByIndex(21);
    await dashboardPageBenchmarkingKpi.waitForResults(5000);
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona due o più comuni dal menù a tendina', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const confirmRequest = async function (page, reporter) {
    // Reuse existing method in the prompt without redefining them
    await selectDashboardMenuItem(page, null);
}