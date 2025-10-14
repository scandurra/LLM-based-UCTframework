import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

export const accessCensusSheetSectionWithSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAndAuthenticate(page, null);
    await selectCensusSheetMenu(page, null);

    expect(page.url()).toBe(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC5_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento', 'La tabella con le informazioni viene visualizzata correttamente', 'La tabella con le informazioni è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const searchForData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.searchInput.fill('Search term');
    await censusSheetPage.searchButton.click();

    expect(censusSheetPage.searchResults).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC5_ID2', 'Inserisci un termine di ricerca e premi il pulsante di ricerca', 'I risultati della ricerca vengono visualizzati correttamente', 'I risultati della ricerca sono stati visualizzati correttamente', true, {}, executionTime);
    }
}