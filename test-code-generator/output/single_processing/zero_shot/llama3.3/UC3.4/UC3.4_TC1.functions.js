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
    if (reporter) {
        reporter.addStep('UC3.4_TC1_ID1', 'Access the census sheet section', 'The list of census sheets is visible', 'The list of census sheets is visible', true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const clickAzioneButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4_TC1_ID2', 'Click on the actions button of a census sheet', 'The operations palette is displayed correctly', 'The operations palette is displayed correctly', true, '', executionTime);
    }

    expect(await censusSheetPage.actionDropdown.isVisible()).toBeTruthy();
}