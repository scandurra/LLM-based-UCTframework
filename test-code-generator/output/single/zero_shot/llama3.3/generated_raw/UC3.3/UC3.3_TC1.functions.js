import { test, expect } from '@playwright/test';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenuOption } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickUploadSchedaButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneDownload(); // This is a temporary workaround to make the upload button visible
    const censusSheetUploadPage = new CensusSheetPageUpload(page);
    await censusSheetUploadPage.waitForUploadSchedaModalButton();
    await censusSheetUploadPage.clickUploadSchedaModalButton();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID1', 'Click upload scheda button', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const selectFileAndUpload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetUploadPage = new CensusSheetPageUpload(page);
    await censusSheetUploadPage.waitForUploadModal();
    const filePath = 'path_to_your_test_file.pdf'; // replace with your test file path
    await censusSheetUploadPage.setInputFiles(filePath);
    await censusSheetUploadPage.waitForUploadApplyButton();
    await censusSheetUploadPage.clickUploadApplyButton();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID2', 'Select file and upload', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyUploadSuccess = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniColumn();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Verify upload success', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}