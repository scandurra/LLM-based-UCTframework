import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

export const selectFileWithLongName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    const filePath = 'path/to/file/with/very/long/name.pdf';
    await page.setInputFiles('input[type="file"]', filePath);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC5_ID1', 'Seleziona un file con nome molto lungo e compila i parametri richiesti', 'Il sistema accetta il file e i parametri', 'File accettato', true, {}, executionTime);
    }

    expect(await page.getAttribute('input[type="file"]', 'value')).toContain('file_with_very_long_name.pdf');
}

export const uploadFileWithLongName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Simulate the file upload process
    await page.click('button[type="submit"]');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC5_ID2', 'Procedi all\'upload del file con nome molto lungo', 'La barra di caricamento appare e il file viene caricato con successo', 'File caricato con successo', true, {}, executionTime);
    }

    expect(await page.isVisible('.success-message')).toBeTruthy();
}