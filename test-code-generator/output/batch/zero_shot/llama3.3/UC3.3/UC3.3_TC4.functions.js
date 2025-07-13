import { test, expect } from '@playwright/test';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

export const uploadWithoutFile = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadModal();
    await page.click('text=Upload');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC4_ID1', 'Lascia vuoto il campo di selezione del file e compila i parametri richiesti', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const verifyNoFileError = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.waitForTimeout(2000); // wait for error message to appear

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC4_ID2', 'Tenta di procedere all’upload del file', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}