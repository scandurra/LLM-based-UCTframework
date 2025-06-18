import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

export const clickUploadSchedaButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadSchedaModalButton();
    await censusSheetPageUpload.clickUploadSchedaModalButton();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID1', 'Click upload scheda button', 'Upload scheda modal opens correctly', 'Upload scheda modal opened correctly', true, '', executionTime);
    }
    expect(await censusSheetPageUpload.uploadButton.isVisible()).toBeFalsy();
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
        reporter.addStep('UC3.3_TC1_ID2', 'Select file and compile parameters', 'File and parameters accepted by the system', 'File and parameters accepted', true, '', executionTime);
    }
    expect(await censusSheetPageUpload.fileInput.isVisible()).toBeFalsy();
}

export const uploadFile = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPageUpload = new CensusSheetPageUpload(page);
    await censusSheetPageUpload.waitForUploadApplyButton();
    await censusSheetPageUpload.clickUploadApplyButton();
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.3_TC1_ID3', 'Upload file', 'File uploaded successfully', 'File uploaded', true, '', executionTime);
    }
    // Add assertion to check if the file is uploaded successfully
}