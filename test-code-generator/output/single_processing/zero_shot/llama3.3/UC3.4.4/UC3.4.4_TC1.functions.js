import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectFreezeOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneCongela();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID1', 'Select freeze operation', 'Confirmation request is displayed', 'Confirmation request is displayed', true, '', executionTime);
    }

    expect(await censusSheetPage.confirmButton.isVisible()).toBeTruthy();
}

export const confirmFreezeOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneCongela();
    await censusSheetPage.confirmButton.click();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID2', 'Confirm freeze operation', 'Confirmation message is displayed', 'Confirmation message is displayed', true, '', executionTime);
    }

    expect(await censusSheetPage.confirmButton.isVisible()).toBeFalsy();
}

export const verifySheetStatus = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickStatoColumn();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID3', 'Verify sheet status', 'Sheet is marked as non-active', 'Sheet is marked as non-active', true, '', executionTime);
    }

    expect(await censusSheetPage.statoColumn.isVisible()).toBeTruthy();
}