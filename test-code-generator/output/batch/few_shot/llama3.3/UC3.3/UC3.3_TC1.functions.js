import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

export const clickUploadSchedaModalButton = async function(page, reporter) {
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    const startTime = new Date().getTime();
    
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    await censusSheetPageUpload.clickUploadSchedaModalButton();

    expect(await page.isVisible('#upload_sheet_file')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID1', 'Clicca sul tasto di caricamento delle schede censimento', 'La finestra di caricamento si apre correttamente', 'La finestra di caricamento è stata aperta correttamente', true, {}, executionTime);
    }
}

export const selectFileAndUpload = async function(page, reporter) {
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    const startTime = new Date().getTime();
    
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    await page.setInputFiles('input[type="file"]', 'path/to/file.pdf');
    await censusSheetPageUpload.clickUploadSchedaModalButton();

    expect(await page.isVisible('#upload_sheet_file')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID2', 'Seleziona un file in formato supportato e compila i parametri richiesti', 'Il sistema accetta il file e i parametri', 'Il file è stato selezionato e caricato con successo', true, {}, executionTime);
    }
}

export const proceedToUpload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.click('text="Carica"');

    expect(await page.isVisible('#upload_success')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Procedi all\'upload del file', 'La barra di caricamento appare e il file viene caricato con successo', 'Il file è stato caricato con successo', true, {}, executionTime);
    }
}