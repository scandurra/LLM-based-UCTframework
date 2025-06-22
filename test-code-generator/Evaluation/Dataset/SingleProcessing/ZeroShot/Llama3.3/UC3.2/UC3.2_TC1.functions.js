import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessSearchSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchInput.waitFor({ state: 'visible' });

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await censusSheetPage.searchInput.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID1', 'Access the search section', 'The search bar is visible', `Search input is ${await censusSheetPage.searchInput.isVisible()}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const insertValidSearchParams = async function(page, reporter) {
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
        reporter.addStep('UC3.2_TC1_ID2', 'Insert valid search parameters', 'The parameters are accepted', `Search input is ${await censusSheetPage.searchInput.isVisible()}`, passFail, '', executionTime);
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
    if (!(await censusSheetPage.azioniColumn.isVisible())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID3', 'Execute the search', 'The information related to the inserted parameters is displayed', `Azioni column is ${await censusSheetPage.azioniColumn.isVisible()}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}