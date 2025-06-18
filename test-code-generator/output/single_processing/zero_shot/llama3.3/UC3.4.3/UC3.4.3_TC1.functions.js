import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectEditOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneEdit();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        // Add a check to verify the edit section is visible
        await page.waitForNavigation({ waitUntil: 'networkidle' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID1', 'Select the edit operation on the census sheet', 'The edit section is displayed correctly', `Clicked on edit button`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const modifyFieldsWithValidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement the logic to modify fields with valid data
    // For demonstration purposes, assume we have a method to fill the form
    await page.fill('input[name="field1"]', 'valid-data-1');
    await page.fill('input[name="field2"]', 'valid-data-2');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        // Add a check to verify the data is accepted and saved
        await page.waitForNavigation({ waitUntil: 'networkidle' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID2', 'Modify fields with valid data', 'The data is accepted and saved', `Filled form with valid data`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmChanges = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement the logic to confirm changes
    // For demonstration purposes, assume we have a button to submit the form
    await page.click('button[type="submit"]');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        // Add a check to verify the information is updated successfully
        await page.waitForNavigation({ waitUntil: 'networkidle' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID3', 'Confirm changes', 'The information is updated successfully', `Submitted form`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}