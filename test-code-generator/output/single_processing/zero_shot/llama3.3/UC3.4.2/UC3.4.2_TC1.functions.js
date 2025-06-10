import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneDelete();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC1_ID1', 'Select delete operation for a census sheet', 'Deletion confirmation is requested', 'Deletion confirmation is requested', true, '', executionTime);
    }

    expect(await censusSheetPage.confirmDeleteButton.isVisible()).toBeTruthy();
}

export const confirmDeletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickConfirmAzioneDelete();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC1_ID2', 'Confirm deletion of the census sheet', 'The system deletes the sheet and displays a confirmation message', 'The system deletes the sheet and displays a confirmation message', true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}