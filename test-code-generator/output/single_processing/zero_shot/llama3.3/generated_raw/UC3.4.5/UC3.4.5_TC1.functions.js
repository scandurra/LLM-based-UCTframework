import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDettaglioOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneDettaglio();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes('dettaglio'))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID1', 'Select dettaglio operation', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyGeneralData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // TO DO: implement verification of general data
    // For now, just a placeholder
    let passFail = true;
    if (passFail) {
        passFail = false;
    }
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID2', 'Verify general data', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const navigateHierarchy = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // TO DO: implement navigation of hierarchy
    // For now, just a placeholder
    let passFail = true;
    if (passFail) {
        passFail = false;
    }
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID3', 'Navigate hierarchy', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}