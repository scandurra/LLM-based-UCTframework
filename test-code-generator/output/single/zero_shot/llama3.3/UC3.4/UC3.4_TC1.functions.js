import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAndAuthenticate(page, null);
    await selectCensusSheetMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await page.waitForNavigation({ url: process.env.E2E_CTS_URL });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4_TC1_ID1', 'Access the census sheet section', 'The census sheet list is visible', `Navigated to ${process.env.E2E_CTS_URL}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const clickAzioneButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        await censusSheetPage.actionDropdown.waitFor({ state: 'visible' });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4_TC1_ID2', 'Click the azioni button', 'The operations palette is visible', `Clicked on azioni button`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}