import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const insertValidSearchName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID1', 'Inserisci un nome valido nella barra di ricerca', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();
}

export const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID2', 'Conferma la ricerca', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const viewSearchResults = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID3', 'Visualizza i dettagli delle schede censimento trovate', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.detailOption.isVisible()).toBeTruthy();
}