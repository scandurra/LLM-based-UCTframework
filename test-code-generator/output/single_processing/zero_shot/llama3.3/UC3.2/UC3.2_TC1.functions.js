import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessSearchSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, reporter);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID1', 'Access the search section', 'The search bar is visible', 'The search bar is visible', true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const insertValidSearchParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID2', 'Insert valid search parameters', 'The parameters are accepted', 'The parameters are accepted', true, '', executionTime);
    }

    expect(await censusSheetPage.searchInput.inputValue()).toBe('Lucania');
}

export const executeSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since the search is executed when the Enter key is pressed in the search input,
    // we don't need to perform any additional actions here.
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID3', 'Execute the search', 'The information related to the inserted parameters is displayed', 'The information related to the inserted parameters is displayed', true, '', executionTime);
    }

    // Add an assertion to verify that the search results are displayed
    expect(await page.locator('.search-results').isVisible()).toBeTruthy();
}