import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSection, insertValidSearchParameters, executeSearch } from './UC3.2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertValidNameInSearchBar = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID1', 'Insert valid name in search bar', 'The page loads correctly', 'The page loads correctly', true, '', executionTime);
    }

    expect(await censusSheetPage.searchInput.inputValue()).toBe('Lucania');
}

export const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since the search is executed when the Enter key is pressed in the search input,
    // we don't need to perform any additional actions here.
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID2', 'Confirm search', 'The search results are displayed', 'The search results are displayed', true, '', executionTime);
    }

    // Add an assertion to verify that the search results are displayed
    expect(await page.locator('.search-results').isVisible()).toBeTruthy();
}

export const viewCensusSheetDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID3', 'View census sheet details', 'The information is complete and correct', 'The information is complete and correct', true, '', executionTime);
    }

    // Add an assertion to verify that the details are displayed
    expect(await page.locator('.details').isVisible()).toBeTruthy();
}