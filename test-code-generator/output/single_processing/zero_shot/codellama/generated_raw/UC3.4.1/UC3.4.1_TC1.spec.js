import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import SidebarPage from '../../models/page_object_models/sidebar_page.js';

import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

// Initialize the reporter object
let reporter;

test.beforeEach(async ({ page }) => {
    // Create a new instance of TestResultReporter for each test case
    reporter = new TestResultReporter();
});

test("UC3_TC1 - Download scheda censimento con successo", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("Download scheda censimento con successo");
    
    // Create a new instance of LoginPage, SidebarPage and CensusSheetPage for each test case
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const censusSheetPage = new CensusSheetPage(page);

    // Call the step functions in sequence
    await step1_AccediAllaSezioneDelleSchedeCensimento(loginPage, sidebarPage, censusSheetPage, reporter);
    await step2_SelezionaOperazioneDownloadSchedaCensimento(censusSheetPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});