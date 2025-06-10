// Import necessary libraries and page object models
const { test, expect } = require('@playwright/test');
const TestResultReporter = require("../../models/test-result-reporter.js");
const LoginPage = require("../../models/page_object_models/login_page.js");
const NavbarPage = require("../../models/page_object_models/navbar_page.js");

// Initialize the reporter object
let reporter;

test.beforeEach(async ({ page }) => {
  // Create a new instance of TestResultReporter for each test case
  reporter = new TestResultReporter();
});

test("UC5_TC1 - Selezione lingua italiana", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC1 - Selezione lingua italiana");
    
    // Create a new instance of LoginPage for each test case
    const loginPage = new LoginPage(page);
    const navbarPage = new NavbarPage(page);

    // Call the step functions in sequence
    await step1_AccediAlPortaleECliccaSulProprioNomeUtenteInAltoADestra(loginPage, reporter);
    await step2_SelezionaLaLinguaItalianaDalMenùATendina(navbarPage, reporter);
    await step3_VerificaCheDopoIlRicaricamentoDellaPaginaIlPortaleSiaVisualizzatoInItaliano(page, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});