import { test, expect } from '@playwright/test';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickUploadSchedaButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    await censusSheetPageUpload.clickUploadSchedaModalButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForSelector('#upload_sheet_file', { state: 'visible' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID1', 'Click on the upload census sheet button', 'The upload window opens correctly', `Upload window opened`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const selectFileAndProceed = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadModal();
    const filePath = 'path/to/test-data/SchedaCensimentoV2_Esempio1.pdf'; // replace with actual file path
    await censusSheetPageUpload.setInputFiles(filePath);
    await censusSheetPageUpload.waitForUploadApplyButton();
    await censusSheetPageUpload.clickUploadApplyButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        // Add a check to ensure the file is uploaded successfully
        await page.waitForSelector('#upload_sheet_file', { state: 'hidden' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID2', 'Select a file and proceed with upload', 'The system accepts the file and parameters', `File uploaded successfully`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyUploadSuccess = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Add a check to ensure the upload is successful
    let passFail = true;
    try {
        await page.waitForSelector('#upload_sheet_file', { state: 'hidden' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Verify upload success', 'The file is uploaded with success', `Upload successful`, passFail, '', 0);
    }

    expect(passFail).toBeTruthy();
}