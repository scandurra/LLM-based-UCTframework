import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import SidebarPage from '../../models/page_object_models/sidebar_page.js';

import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

export const step1_AccediAllaSezioneDelleSchedeCensimento = async function(loginPage, sidebarPage, censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Login button in the top right corner of the page
    await loginPage.clickLoginButton();
    
    // Wait for the Login form to appear
    await loginPage.waitForLoginFormToAppear();
    
    // Enter the username and password in the Login form
    await loginPage.enterUsernameAndPassword('testuser', 'password');
    
    // Click on the Submit button in the Login form
    await loginPage.clickSubmitButton();
    
    // Wait for the Sidebar menu to appear
    await sidebarPage.waitForSidebarMenuToAppear();
    
    // Click on the Census Card section in the Sidebar menu
    await sidebarPage.clickCensusCardButton();
    
    // Wait for the Census Sheet page to appear
    await censusSheetPage.waitForCensusSheetPageToAppear();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla sezione delle schede censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}

export const step2_CliccaSulTastoAzioniDiUnaSchedaCensimento = async function(censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Actions button of a Census Sheet card
    await censusSheetPage.clickActionsButtonOfFirstCensusSheetCard();
    
    // Wait for the Actions menu to appear
    await censusSheetPage.waitForActionsMenuToAppear();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Clicca sul tasto azioni di una scheda censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.actions-menu');
}

export const step3_ConfermaIlCongelamentoDellaScheda = async function(censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Freeze button in the Actions menu
    await censusSheetPage.clickFreezeButtonInActionsMenu();
    
    // Wait for the Confirmation dialog to appear
    await censusSheetPage.waitForConfirmationDialogToAppear();
    
    // Click on the Yes button in the Confirmation dialog
    await censusSheetPage.clickYesButtonInConfirmationDialog();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID3', 'Conferma il congelamento della scheda', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.success-message');
}

export const step4_VerificaLoStatoDellaSchedaDopoIlCongelamento = async function(censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Refresh button in the Census Sheet card
    await censusSheetPage.clickRefreshButtonOfFirstCensusSheetCard();
    
    // Wait for the Census Sheet card to refresh
    await censusSheetPage.waitForFirstCensusSheetCardToRefresh();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID4', 'Verifica lo stato della scheda dopo il congelamento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.inactive-census-sheet');
}