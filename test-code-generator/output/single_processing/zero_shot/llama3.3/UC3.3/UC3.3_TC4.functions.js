import { test, expect } from '@playwright/test';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickUploadSchedaModalButton = async function(page, reporter) {
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
        reporter.addStep('UC3.3_TC4_ID1', 'Click on the upload census sheet button', 'The upload window opens correctly', `Upload window opened`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const leaveFileInputEmptyAndTryToUpload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadModal();
    await censusSheetPageUpload.clickUploadApplyButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        // Check if error message is displayed
        await page.locator('text=Error: No file selected').waitFor({ state: 'visible' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.3_TC4_ID2', 'Leave file input empty and try to upload', 'An error message is displayed', `Error message displayed`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}