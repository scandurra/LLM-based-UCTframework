// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const CensusSheetPage = require("../../models/page_object_models/census_sheet_page.js");

async function step1_AccediAllaPiattaformaEAutenticaCorrettamente(loginPage, sidebarPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Accedi alla piattaforma e autenticati correttamente
    await loginPage.clickLoginLink();
    await loginPage.fillEmail("test@example.com");
    await loginPage.fillPassword("password");
    await loginPage.clickLoginButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autenticati correttamente', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the sidebar is visible after login
    await expect(sidebarPage.sidebarSelector).toBeVisible();
}

async function step2_SelezionaVoceDelMenuLateraleRelativaAlleSchedeCensimento(sidebarPage, censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Seleziona la voce del menù laterale relativa alle schede censimento
    await sidebarPage.clickCensusSheetsLink();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the census sheet page is visible after clicking on the sidebar link
    await expect(censusSheetPage.pageSelector).toBeVisible();
}