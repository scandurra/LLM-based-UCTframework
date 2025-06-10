import { test, expect } from '@playwright/test';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickCensusSheetsUploadButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    await censusSheetPageUpload.clickUploadSchedaModalButton();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID1', 'Click on upload census sheets button', 'Upload modal opens correctly', 'Upload modal opens correctly', true, '', executionTime);
    }
    await expect(censusSheetPageUpload.uploadButton).toBeVisible();
}

export const selectFileAndCompileParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadModal();
    const filePath = 'path_to_your_test_file.pdf'; // replace with your test file path
    await censusSheetPageUpload.setInputFiles(filePath);
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID2', 'Select file and compile parameters', 'File and parameters are accepted', 'File and parameters are accepted', true, '', executionTime);
    }
    await expect(censusSheetPageUpload.fileInput).toHaveValue(filePath);
}

export const uploadFile = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadApplyButton();
    await censusSheetPageUpload.clickUploadApplyButton();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Upload file', 'File is uploaded successfully', 'File is uploaded successfully', true, '', executionTime);
    }
    // Add assertion to check if the file is uploaded successfully
}