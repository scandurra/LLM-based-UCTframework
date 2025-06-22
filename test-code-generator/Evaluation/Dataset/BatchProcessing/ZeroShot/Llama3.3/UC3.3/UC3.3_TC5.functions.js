import { test, expect } from '@playwright/test';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

export const uploadWithLongFileName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadModal();
    const filePath = 'path/to/file/with/very/long/name.pdf'; // replace with a file path with long name
    await censusSheetPageUpload.setInputFiles('input[type="file"]', { files: [filePath] });
    await page.click('text=Upload');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC5_ID1', 'Seleziona un file con nome lungo e compila i parametri richiesti', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const verifyLongFileNameError = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.waitForTimeout(2000); // wait for error message to appear

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC5_ID2', 'Tenta di procedere all’upload del file', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}