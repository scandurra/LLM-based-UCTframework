// Import necessary libraries and page object models
import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import SidebarPage from '../../models/page_object_models/sidebar_page.js';

import DashboardPageBenchmarkingKpi from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

// Initialize the reporter object
const reporter = new TestResultReporter();

// Define the test case
test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({ page, browserName }) => {
    // Set the browser name and test case title in the reporter
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Selezione di comuni e KPI validi per benchmarking");
    
    // Initialize the LoginPage, SidebarPage, and DashboardPageBenchmarkingKpi objects
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const dashboardPageBenchmarkingKpi = new DashboardPageBenchmarkingKpi(page);
    
    // Call step functions in sequence
    await step1_SelectTwoOrMoreCities(loginPage, sidebarPage, dashboardPageBenchmarkingKpi, reporter);
    await step2_SelectValidKpi(loginPage, sidebarPage, dashboardPageBenchmarkingKpi, reporter);
    await step3_ConfirmRequest(loginPage, sidebarPage, dashboardPageBenchmarkingKpi, reporter);
    
    // Report the test case result
    reporter.onTestEnd(test, { status: "passed" });
});