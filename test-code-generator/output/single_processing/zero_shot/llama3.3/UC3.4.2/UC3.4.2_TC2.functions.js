import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneDelete();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID1', 'Select delete operation of a census sheet', 'Deletion confirmation is requested', 'Deletion confirmation is requested', true, '', executionTime);
    }

    expect(await censusSheetPage.cancelDeleteButton.isVisible()).toBeTruthy();
}

export const cancelDeletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickCancelAzioneDelete();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID2', 'Cancel deletion of the census sheet', 'Deletion operation is interrupted and the sheet remains intact', 'Deletion operation is interrupted and the sheet remains intact', true, '', executionTime);
    }

    expect(await !censusSheetPage.cancelDeleteButton.isVisible()).toBeTruthy();
}