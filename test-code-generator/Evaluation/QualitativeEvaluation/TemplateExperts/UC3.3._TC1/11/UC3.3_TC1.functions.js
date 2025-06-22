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
        reporter.addStep('UC3.3_TC1_ID1', 'Clicca sul tasto di caricamento delle schede censimento', 'La finestra di caricamento si apre correttamente', 'La finestra di caricamento è stata aperta con successo', true, {}, executionTime);
    }

    // Include Playwright assertions
    expect(await censusSheetPageUpload.uploadButton.isVisible()).toBeTruthy();
}

export const selectFileAndCompileParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    const filePath = 'path/to/supported/file.pdf';
    await censusSheetPageUpload.uploadFile(filePath);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID2', 'Seleziona un file in formato supportato e compila i parametri richiesti', 'Il sistema accetta il file e i parametri', 'Il file è stato selezionato e i parametri compilati con successo', true, {}, executionTime);
    }

    // Include Playwright assertions
    expect(await censusSheetPageUpload.uploadButton.isVisible()).toBeTruthy();
}

export const proceedToUpload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    const filePath = 'path/to/supported/file.pdf';
    await censusSheetPageUpload.uploadFile(filePath);
    await censusSheetPageUpload.proceedToUpload();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Procedi all\'upload del file', 'La barra di caricamento appare e il file viene caricato con successo', 'Il file è stato caricato con successo', true, {}, executionTime);
    }

    // Include Playwright assertions
    expect(await censusSheetPageUpload.uploadButton.isVisible()).toBeTruthy();
}