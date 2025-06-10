const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const CensusSheetPage = require("../../models/page_object_models/census_sheet_page.js");

async function step1_AccediAllaSezioneDelleSchedeCensimento(loginPage, sidebarPage, censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Accedi alla sezione delle schede censimento
    await loginPage.clickLoginLink();
    await loginPage.fillEmail("test@example.com");
    await loginPage.fillPassword("password");
    await loginPage.clickLoginButton();
    await sidebarPage.clickCensusSheetsLink();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla sezione delle schede censimento', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the census sheet page is visible after clicking on the sidebar link
    await expect(censusSheetPage.pageSelector).toBeVisible();
}

async function step2_CliccaSulTastoAzioniDiUnaSchedaCensimento(censusSheetPage, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Clicca sul tasto azioni di una scheda censimento
    await censusSheetPage.clickAzioniButton();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Clicca sul tasto azioni di una scheda censimento', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the action palette is visible after clicking on the button
    await expect(censusSheetPage.actionPaletteSelector).toBeVisible();
}
// File: UC3_TC1.spec.js
const { test, expect } = require('@playwright/test');
const TestResultReporter = require("../../models/test-result-reporter.js");
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const CensusSheetPage = require("../../models/page_object_models/census_sheet_page.js");

test.beforeEach(async ({ page }) => {
  // Create a new instance of TestResultReporter for each test case
  reporter = new TestResultReporter();
});

