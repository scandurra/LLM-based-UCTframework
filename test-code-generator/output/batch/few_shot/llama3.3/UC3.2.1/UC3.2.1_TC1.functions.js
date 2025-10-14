import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertValidName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.searchByName('Lucania');

    expect(await censusSheetPage.searchInput.isVisible()).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID1', 'Inserisci un nome valido nella barra di ricerca', 'La pagina di risultati si carica correttamente', 'La pagina di risultati è stata caricata correttamente', true, {}, executionTime);
    }
}

export const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we already executed the search in insertValidName
    // We just need to check if the results are visible

    expect(await page.isVisible('text=Lucania')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID2', 'Conferma la ricerca', 'I risultati della ricerca vengono visualizzati', 'I risultati della ricerca sono stati visualizzati correttamente', true, {}, executionTime);
    }
}

export const viewDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneDettaglio();

    expect(await page.isVisible('text=Dettagli')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID3', 'Visualizza i dettagli delle schede censimento trovate', 'Le informazioni sono complete e corrette', 'Le informazioni sono state visualizzate correttamente', true, {}, executionTime);
    }
}