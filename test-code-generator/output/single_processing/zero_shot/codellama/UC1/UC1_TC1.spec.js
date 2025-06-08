// Import necessary libraries and page object models
const { test, expect } = require('@playwright/test');
const TestResultReporter = require("../../models/test-result-reporter.js");
const LoginPage = require("../../models/page_object_models/login_page.js");

// Initialize the reporter object
let reporter;

test.beforeEach(async ({ page }) => {
  // Create a new instance of TestResultReporter for each test case
  reporter = new TestResultReporter();
});

test("UC1_TC1 - Login con credenziali valide", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1 - Login con credenziali valide");
    
    // Create a new instance of LoginPage for each test case
    const loginPage = new LoginPage(page);

    // Call the step functions in sequence
    await step1_InserisciCredenzialiCorretteNelFormDiLogin(loginPage, reporter);
    await step2_CliccaTastoLogin(loginPage, reporter);
    await step3_VisualizzaMessaggioOperazioneCompletataConSuccesso(loginPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});