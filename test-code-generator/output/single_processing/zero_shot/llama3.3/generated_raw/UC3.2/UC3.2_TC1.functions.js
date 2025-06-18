import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenuOption } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessSearchSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenuOption(page, null);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID1', 'Access search section', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const insertValidSearchParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await censusSheetPage.searchInput.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID2', 'Insert valid search parameters', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const executeSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchInput.press('Enter');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID3', 'Execute search', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}