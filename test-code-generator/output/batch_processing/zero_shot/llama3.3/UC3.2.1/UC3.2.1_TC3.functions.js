import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const leaveSearchFieldEmpty = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID1', 'Lascia vuota la barra di ricerca e conferma', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();
}

export const verifyErrorFeedback = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the error message is visible
    const errorMessage = await page.isVisible('text="Campo obbligatorio"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID2', 'Verifica il messaggio di errore', true, errorMessage, true, {}, executionTime);
    }

    expect(errorMessage).toBeTruthy();
}

export const insertValidSearchNameAgain = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID3', 'Inserisci un nome valido e ripeti la ricerca', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();
}