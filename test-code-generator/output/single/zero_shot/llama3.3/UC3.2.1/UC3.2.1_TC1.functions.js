import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSection, insertValidSearchParams, executeSearch } from './UC3.2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertValidNameInSearchBar = async function(page, reporter) {
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
        reporter.addStep('UC3.2.1_TC1_ID1', 'Insert valid name in search bar', 'The page loads correctly', `Search input is ${await censusSheetPage.searchInput.isVisible()}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchInput.press('Enter');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await censusSheetPage.azioniColumn.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID2', 'Confirm search', 'The search results are displayed', `Azioni column is ${await censusSheetPage.azioniColumn.isVisible()}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const viewCensusSheetDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await censusSheetPage.detailOption.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID3', 'View census sheet details', 'The information is complete and correct', `Detail option is ${await censusSheetPage.detailOption.isVisible()}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}