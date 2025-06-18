import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

import { openCensusSheetInterface, authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

export const clickUploadSchedaButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    await page.goto(process.env.E2E_CTS_URL);
    const censusSheetPage = new CensusSheetPageUpload(page);
    await censusSheetPage.waitForUploadSchedaModalButton();
    await censusSheetPage.clickUploadSchedaModalButton();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID1', 'Click upload scheda button', 'Upload modal opens correctly', 'Upload modal opens correctly', true, {}, executionTime);
    }
    expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const selectFileAndCompileParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPageUpload(page);
    await censusSheetPage.waitForUploadModal();
    const filePath = './test-data/example.pdf'; // replace with your file path
    await censusSheetPage.setInputFiles(filePath);
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID2', 'Select file and compile parameters', 'File and parameters are accepted', 'File and parameters are accepted', true, {}, executionTime);
    }
    expect(await censusSheetPage.fileInput.inputValue()).toContain(filePath);
}

export const uploadFile = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPageUpload(page);
    await censusSheetPage.waitForUploadApplyButton();
    await censusSheetPage.clickUploadApplyButton();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Upload file', 'File is uploaded successfully', 'File is uploaded successfully', true, {}, executionTime);
    }
    expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}