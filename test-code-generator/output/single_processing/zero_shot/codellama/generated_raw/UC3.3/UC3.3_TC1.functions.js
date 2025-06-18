import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

import CensusSheetPage from '../../models/page_object_models/census_sheet_page.js';

export const step1_ClickUploadCensusCardButton = async function(censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Upload Census Card button
    await censusSheetPage.clickUploadCensusCardButton();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Clicca sul tasto di caricamento delle schede censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.upload-census-card-modal');
}

export const step2_SelectSupportedFileAndFillParameters = async function(censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Select a supported file (e.g. PDF) and fill in the parameters
    await censusSheetPage.selectSupportedFileAndFillParameters();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona un file in formato supportato (es. PDF) e compila i parametri richiesti', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.upload-census-card-modal');
}

export const step3_UploadFile = async function(censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Upload button to proceed with file upload
    await censusSheetPage.clickUploadButton();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID3', 'Procedi all\'upload del file', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.success-message');
}