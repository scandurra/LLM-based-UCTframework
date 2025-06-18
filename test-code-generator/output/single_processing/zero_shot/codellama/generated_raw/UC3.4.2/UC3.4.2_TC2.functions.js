import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';


import LoginPage from '../../models/page_object_models/login_page.js';


import SidebarPage from '../../models/page_object_models/sidebar_page.js';


import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

export const step1_AccediAllaSezioneDelleSchedeCensimento = async function (loginPage, sidebarPage, censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Login button in the Sidebar menu
    await loginPage.clickLoginButton();
    
    // Wait for the Census Sheet page to appear
    await censusSheetPage.waitForCensusSheetPageToAppear();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC2_ID1', 'Accedi alla sezione delle schede censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}

export const step2_SelezionaLOperazioneDiCancellazioneDiUnaSchedaCensimentoEsistente = async function (censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Delete button of an existing Census Sheet card
    await censusSheetPage.clickDeleteButtonOfExistingCensusSheetCard();
    
    // Wait for the confirmation dialog to appear
    await censusSheetPage.waitForConfirmationDialogToAppear();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC2_ID2', 'Seleziona l\'operazione di cancellazione di una scheda censimento esistente', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.confirmation-dialog');
}

export const step3_AnnullaLEliminazioneDellaSchedaIndicata = async function (censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Cancel button in the confirmation dialog
    await censusSheetPage.clickCancelButtonInConfirmationDialog();
    
    // Wait for the confirmation dialog to disappear
    await censusSheetPage.waitForConfirmationDialogToDisappear();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC2_ID3', 'Annulla l\'eliminazione della scheda indicata', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}
// File: UC3.4_TC2.spec.js
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

test("UC3_TC2 - Annullamento eliminazione scheda censimento", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("Annullamento eliminazione scheda censimento");
    
    // Create a new instance of LoginPage, SidebarPage and CensusSheetPage for each test case
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const censusSheetPage = new CensusSheetPage(page);

    // Call the step functions in sequence
    await step1_AccediAllaSezioneDelleSchedeCensimento(loginPage, sidebarPage, censusSheetPage, reporter);
    await step2_SelezionaLOperazioneDiCancellazioneDiUnaSchedaCensimentoEsistente(censusSheetPage, reporter);
    await step3_AnnullaLEliminazioneDellaSchedaIndicata(censusSheetPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});