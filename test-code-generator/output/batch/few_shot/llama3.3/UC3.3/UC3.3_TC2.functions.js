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
        reporter.addStep('UC3.3_TC2_ID1', 'Clicca sul tasto di caricamento delle schede censimento', 'La finestra di caricamento si apre correttamente', 'La finestra di caricamento è stata aperta correttamente', true, {}, executionTime);
    }
}

export const selectUnsupportedFileAndUpload = async function(page, reporter) {
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    const startTime = new Date().getTime();
    
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    await page.setInputFiles('input[type="file"]', 'path/to/file.mp3');
    await censusSheetPageUpload.clickUploadSchedaModalButton();

    expect(await page.isVisible('#error_message')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC2_ID2', 'Seleziona un file in formato non supportato e compila i parametri richiesti', 'Il sistema segnala un errore di formato non supportato', 'Un errore di formato non supportato è stato segnalato', true, {}, executionTime);
    }
}

export const tryToProceedToUpload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.click('text="Carica"');

    expect(await page.isVisible('#error_message')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC2_ID3', 'Tenta di procedere all\'upload del file', 'L\'operazione viene bloccata e viene mostrato un messaggio di errore', 'Un messaggio di errore è stato mostrato', true, {}, executionTime);
    }
}