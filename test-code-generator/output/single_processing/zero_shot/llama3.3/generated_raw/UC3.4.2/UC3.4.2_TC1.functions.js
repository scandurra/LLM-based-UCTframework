import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneDelete();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await censusSheetPage.confirmDeleteButton.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.2_TC1_ID1', 'Select delete operation', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmDeletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickConfirmAzioneDelete();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.2_TC1_ID2', 'Confirm deletion', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}