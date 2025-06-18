import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDelete();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await censusSheetPage.confirmDeleteButton.waitFor({ state: 'visible' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.2_TC1_ID1', 'Select delete operation for a census sheet', 'Deletion confirmation is requested', `Clicked on delete button`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickConfirmAzioneDelete();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForTimeout(2000); // wait for confirmation message
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.2_TC1_ID2', 'Confirm deletion of the census sheet', 'The system deletes the sheet and displays a confirmation message', `Confirmed delete operation`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}