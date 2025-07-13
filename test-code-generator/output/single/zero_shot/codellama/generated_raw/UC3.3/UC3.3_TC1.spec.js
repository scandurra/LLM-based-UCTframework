import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

// Initialize the reporter object
let reporter;

test.beforeEach(async ({ page }) => {
    // Create a new instance of TestResultReporter for each test case
    reporter = new TestResultReporter();
});

test("UC3_TC1 - Caricamento scheda censimento con dati validi e formato supportato", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC1 - Caricamento scheda censimento con dati validi e formato supportato");
    
    // Create a new instance of CensusSheetPage for each test case
    const censusSheetPage = new CensusSheetPage(page);

    // Call the step functions in sequence
    await step1_ClickUploadCensusCardButton(censusSheetPage, reporter);
    await step2_SelectSupportedFileAndFillParameters(censusSheetPage, reporter);
    await step3_UploadFile(censusSheetPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});