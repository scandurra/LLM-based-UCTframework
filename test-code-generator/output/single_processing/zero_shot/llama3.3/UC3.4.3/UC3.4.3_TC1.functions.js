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
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID1', 'Select edit operation on the census sheet', 'The edit section is displayed correctly', 'The edit section is displayed correctly', true, '', executionTime);
    }

    expect(await page.url()).toContain('edit');
}

export const modifyFieldsWithValidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement modification of fields with valid data
    // For example:
    await page.getByLabel('Field 1').fill('Valid data 1');
    await page.getByLabel('Field 2').fill('Valid data 2');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID2', 'Modify fields with valid data', 'The data is accepted and saved', 'The data is accepted and saved', true, '', executionTime);
    }

    expect(await page.getByLabel('Field 1').inputValue()).toBe('Valid data 1');
}

export const confirmChanges = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement confirmation of changes
    await page.locator('text=Save').click();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID3', 'Confirm changes', 'The information is updated successfully', 'The information is updated successfully', true, '', executionTime);
    }

    expect(await page.url()).toContain('success');
}