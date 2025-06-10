// Import necessary libraries and page object models
const { test, expect } = require('@playwright/test');
const TestResultReporter = require("../../models/test-result-reporter.js");
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const DashboardPageGeneralDataTable = require("../../models/page_object_models/dashboard_page_general_data_table.js");

// Initialize the reporter object
let reporter;

test.beforeEach(async ({ page }) => {
  // Create a new instance of TestResultReporter for each test case
  reporter = new TestResultReporter();
});

test("UC2_TC1 - Visualizzazione tabella dati generali con impostazioni predefinite", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("Visualizzazione tabella dati generali con impostazioni predefinite");
    
    // Create a new instance of LoginPage for each test case
    const loginPage = new LoginPage(page);

    // Call the step functions in sequence
    await step1_AccediAllaSezioneDashboardTramiteIlMenùApposito(loginPage, reporter);
    await step2_ScorriNellaPaginaFinoAVisualizzareLaSezioneTabellareDedicataAiDatiGenerali(sidebarPage, reporter);
    await step3_VerificaCheSiaPossibileScorrereTraIComuniDisponibiliEModificareGliElementiVisualizzatiPerPagina(dashboardPageGeneralDataTable, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});