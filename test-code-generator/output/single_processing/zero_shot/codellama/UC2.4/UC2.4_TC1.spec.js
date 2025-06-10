// Import necessary libraries and page object models
const { test, expect } = require('@playwright/test');
const TestResultReporter = require("../../models/test-result-reporter.js");
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const DashboardBenchmarkingKpiPage = require("../../models/page_object_models/dashboard_benchmarking_kpi.js");

// Initialize the reporter object
let reporter;

test.beforeEach(async ({ page }) => {
    // Create a new instance of TestResultReporter for each test case
    reporter = new TestResultReporter();
});

test("UC2_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("Selezione di comuni e KPI validi per benchmarking");
    
    // Create a new instance of LoginPage for each test case
    const loginPage = new LoginPage(page);

    // Call the step functions in sequence
    await step1_SelezionaDueOpiuComuni(loginPage, reporter);
    await step2_ScegliUnKPIValidoPerIlConfronto(sidebarPage, reporter);
    await step3_ConfermaLaRichiestaCliccandoSulPulsante(dashboardBenchmarkingKpiPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});