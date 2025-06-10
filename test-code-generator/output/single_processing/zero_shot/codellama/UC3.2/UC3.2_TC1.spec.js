// Import necessary libraries and page object models
const { test, expect } = require('@playwright/test');
const TestResultReporter = require("../../models/test-result-reporter.js");
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const CensusSheetPage = require("../../models/page_object_models/census_sheet_page.js");

// Initialize the reporter object
let reporter;

test.beforeEach(async ({ page }) => {
  // Create a new instance of TestResultReporter for each test case
  reporter = new TestResultReporter();
});

test("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo");
    
    // Create a new instance of LoginPage, SidebarPage and CensusSheetPage for each test case
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const censusSheetPage = new CensusSheetPage(page);

    // Call the step functions in sequence
    await step1_AccediAllaPiattaformaEAutenticaCorrettamente(loginPage, sidebarPage, reporter);
    await step2_SelezionaVoceDelMenuLateraleRelativaAlleSchedeCensimento(sidebarPage, censusSheetPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});