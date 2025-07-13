import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const insertNonExistentSearchName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('NonEsistente');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID1', 'Inserisci un nome non presente nel database nella barra di ricerca', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();
}

export const confirmNonExistentSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID2', 'Conferma la ricerca', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const verifyNoResultsMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the no results message is visible
    const noResultsMessage = await page.isVisible('text="Nessun risultato trovato"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID3', 'Verifica il messaggio di feedback', true, noResultsMessage, true, {}, executionTime);
    }

    expect(noResultsMessage).toBeTruthy();
}