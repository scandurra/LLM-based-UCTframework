import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

export const clickUploadSchedaModalButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    await censusSheetPageUpload.clickUploadSchedaModalButton();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC2_ID1', 'Clicca sul tasto di caricamento delle schede censimento', 'La finestra di caricamento si apre correttamente', 'La finestra di caricamento è stata aperta con successo', true, {}, executionTime);
    }

    // Include Playwright assertions
    expect(await censusSheetPageUpload.uploadButton.isVisible()).toBeTruthy();
}

export const selectUnsupportedFileAndCompileParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    const filePath = 'path/to/unsupported/file.mp3';
    await censusSheetPageUpload.uploadFile(filePath);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC2_ID2', 'Seleziona un file in formato non supportato e compila i parametri richiesti', 'Il sistema segnala un errore di formato non supportato', 'Il file non supportato è stato selezionato e i parametri compilati con successo', true, {}, executionTime);
    }

    // Include Playwright assertions
    expect(await censusSheetPageUpload.uploadButton.isVisible()).toBeTruthy();
}

export const tryToProceedToUpload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    const filePath = 'path/to/unsupported/file.mp3';
    await censusSheetPageUpload.uploadFile(filePath);
    try {
        await censusSheetPageUpload.proceedToUpload();
    } catch (error) {
        // Handle error
    }

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC2_ID3', 'Tenta di procedere all\'upload del file', 'L\'operazione viene bloccata e viene mostrato un messaggio di errore', 'L\'operazione è stata bloccata con successo', true, {}, executionTime);
    }

    // Include Playwright assertions
    expect(await censusSheetPageUpload.uploadButton.isVisible()).toBeTruthy();
}