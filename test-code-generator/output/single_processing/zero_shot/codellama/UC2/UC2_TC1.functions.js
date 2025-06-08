// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");

async function step1_AccediAllaPiattaformaComeUtenteRegistrato(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Accedi alla piattaforma come utente registrato
    await LoginPage.clickLoginLink();
    await LoginPage.fillEmail("test@example.com");
    await LoginPage.fillPassword("password");
    await LoginPage.clickLoginButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi alla piattaforma come utente registrato', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the login button is visible and enabled
    await expect(LoginPage.loginButton).toBeVisible();
    await expect(LoginPage.loginButton).not.toBeDisabled();
}

async function step2_SelezionaVoceDiMenuRelativaAllaDashboard(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Seleziona la voce di menù relativa alla dashboard
    await SidebarPage.clickCensusSheetLink();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the census sheet link is visible and enabled
    await expect(SidebarPage.censusSheetLink).toBeVisible();
    await expect(SidebarPage.censusSheetLink).not.toBeDisabled();
}