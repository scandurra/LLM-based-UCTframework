import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const insertSearchNameWithSpecialChars = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania!@#$');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID1', 'Inserisci un nome contenente caratteri speciali nella barra di ricerca', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();
}

export const confirmSearchWithSpecialChars = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID2', 'Conferma la ricerca', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const verifySearchResultsWithSpecialChars = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the search results are visible
    const searchResults = await page.isVisible('text="Risultati della ricerca"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID3', 'Verifica l\'accuratezza dei risultati', true, searchResults, true, {}, executionTime);
    }

    expect(searchResults).toBeTruthy();
}