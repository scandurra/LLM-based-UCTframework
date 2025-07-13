import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessSearchSection, insertValidSearchParameters, executeSearch } from './UC3.2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const searchByName = async function(page, reporter) {
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
        reporter.addStep('UC3.2.1_TC1_ID1', 'Inserisci un nome valido nella barra di ricerca', true, passFail, passFail, '', executionTime);
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
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID2', 'Conferma la ricerca', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const viewDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID3', 'Visualizza i dettagli delle schede censimento trovate', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}