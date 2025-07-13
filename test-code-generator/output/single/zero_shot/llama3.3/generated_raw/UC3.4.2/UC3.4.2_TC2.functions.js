import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDelete();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await censusSheetPage.confirmDeleteButton.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID1', 'Select delete operation', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const cancelDeletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickCancelAzioneDelete();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (await censusSheetPage.confirmDeleteButton.isVisible()) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID2', 'Cancel deletion', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}