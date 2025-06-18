import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDettaglioOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForNavigation({ waitUntil: 'networkidle' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID1', 'Select dettaglio operation on an existing census sheet', 'The detail page opens correctly', `Navigated to detail page`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyGeneralData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to verify general data
    // For example:
    await page.waitForSelector('text=General Data');
    const generalDataText = await page.textContent('text=General Data');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!generalDataText) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID2', 'Verify general data of the area and hierarchy of POD and Aree Omogenee', 'All required data is displayed correctly', `General data text: ${generalDataText}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const navigateHierarchy = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to navigate hierarchy
    // For example:
    await page.click('text=POD');
    await page.click('text=Aree Omogenee');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForNavigation({ waitUntil: 'networkidle' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID3', 'Navigate hierarchy of POD and Aree Omogenee', 'Navigation occurs without errors', `Navigated to hierarchy pages`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}