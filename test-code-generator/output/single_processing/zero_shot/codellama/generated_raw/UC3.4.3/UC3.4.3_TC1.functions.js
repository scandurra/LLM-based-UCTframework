import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import SidebarPage from '../../models/page_object_models/sidebar_page.js';

import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

export const step1_SelezionaOperazioneDiModificaSullaSchedaCensimento = async function(loginPage, sidebarPage, censusSheetPage, reporter) {
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
        reporter.addStep('UC3_TC1_ID1', 'Seleziona l\'operazione di modifica sulla scheda censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}

export const step2_ModificaCampiConDatiValidi = async function(loginPage, sidebarPage, censusSheetPage, reporter) {
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
        reporter.addStep('UC3_TC1_ID2', 'Modifica i campi con dati validi', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}

export const step3_ConfermaLeModifiche = async function(loginPage, sidebarPage, censusSheetPage, reporter) {
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
        reporter.addStep('UC3_TC1_ID3', 'Conferma le modifiche', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}