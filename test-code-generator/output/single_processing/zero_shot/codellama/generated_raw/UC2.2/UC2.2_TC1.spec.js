import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import DashboardPageIlluminationSearch from '../../models/page_object_models/dashboard_page_illumination_search.js';

// Initialize the reporter object
const reporter = new TestResultReporter();

// Define the test case
test("UC2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
    // Set the browser name and test case title in the reporter
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Ricerca impianti di illuminazione con parametri validi");
    
    // Initialize the DashboardPageIlluminationSearch object
    const dashboardPage = new DashboardPageIlluminationSearch(page);
    
    // Call step functions in sequence
    await step1_SelectComuneAndValidParameters(dashboardPage, reporter);
    await step2_ConfirmSearch(dashboardPage, reporter);
    await step3_ViewImpiantiDetails(dashboardPage, reporter);
    
    // Set the test status as passed and end the test
    reporter.onTestEnd(test, { status: "passed" });
});