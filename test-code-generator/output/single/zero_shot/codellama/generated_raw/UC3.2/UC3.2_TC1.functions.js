import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';


import LoginPage from '../../models/page_object_models/login_page.js';


import SidebarPage from '../../models/page_object_models/sidebar_page.js';


import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

export const step1_AccediAllaSezioneDiRicercaSchedeCensimento = async function (loginPage, sidebarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Call the login and open census card section steps from existing code
    await step1_Login(loginPage, reporter);
    await step2_OpenCensusCardSection(sidebarPage, reporter);
    
    // End the timer for execution time calculation
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla sezione di ricerca schede censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}

export const step2_InserisciParametriDiRicercaValidi = async function (censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Call the existing code to insert valid search parameters
    await step3_InsertValidSearchParameters(censusSheetPage);
    
    // End the timer for execution time calculation
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Inserisci parametri di ricerca validi', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.search-parameters');
}

export const step3_EseguiLaRicerca = async function (censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Call the existing code to execute the search
    await step4_ExecuteSearch(censusSheetPage);
    
    // End the timer for execution time calculation
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID3', 'Esegui la ricerca', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.search-results');
}
// File: UC3_TC1.spec.js
import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';
import LoginPage from '../../models/page_object_models/login_page.js';
import SidebarPage from '../../models/page_object_models/sidebar_page.js';
import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

test("UC3_TC1 - Ricerca con parametri validi", async ({ page, browserName }) => {
    // Create a new instance of TestResultReporter for each test case
    const reporter = new TestResultReporter();
    
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC1", "Ricerca con parametri validi");
    
    // Create a new instance of LoginPage, SidebarPage and CensusSheetPage for each test case
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const censusSheetPage = new CensusSheetPage(page);
    
    // Call the step functions in sequence
    await step1_AccediAllaSezioneDiRicercaSchedeCensimento(loginPage, sidebarPage, reporter);
    await step2_InserisciParametriDiRicercaValidi(censusSheetPage, reporter);
    await step3_EseguiLaRicerca(censusSheetPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});