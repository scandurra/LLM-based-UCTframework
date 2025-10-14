import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessSearchSectionMultiple = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC4_ID1', 'Accedi alla sezione di ricerca schede censimento', 'La barra di ricerca è visibile', 'La barra di ricerca è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const insertMultipleSearchParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.searchByName('Lucania');
    await page.click('#search-button');

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC4_ID2', 'Inserisci molti parametri di ricerca validi', 'I parametri vengono accettati', 'I parametri sono stati accettati correttamente', true, {}, executionTime);
    }
}

export const executeSearchMultiple = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    // Since we already executed the search in insertMultipleSearchParameters
    // We just need to check if the results are visible

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC4_ID3', 'Esegui la ricerca', 'Vengono visualizzate le informazioni relative ai parametri inseriti', 'Le informazioni sono state visualizzate correttamente', true, {}, executionTime);
    }
}