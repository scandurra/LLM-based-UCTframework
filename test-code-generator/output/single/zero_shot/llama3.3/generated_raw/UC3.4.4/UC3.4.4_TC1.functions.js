import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenuOption } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectFreezeOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneCongela();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await censusSheetPage.confirmButton.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID1', 'Select freeze operation', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmFreezeOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneCongela();
    await censusSheetPage.confirmButton.click();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.isVisible('text="Operazione eseguita con successo"'))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID2', 'Confirm freeze operation', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifySheetStatus = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickStatoColumn();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.isVisible('text="Non attivo"'))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.4_TC1_ID3', 'Verify sheet status', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}