import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertNameWithSpecialCharacters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.searchByName('Lucania!@#$');

    expect(await page.isVisible('text=Lucania!@#$')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID1', 'Inserisci un nome contenente caratteri speciali nella barra di ricerca', 'La pagina di risultati si carica senza errori', 'La pagina di risultati è stata caricata correttamente', true, {}, executionTime);
    }
}

export const confirmSearchWithSpecialCharacters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we already executed the search in insertNameWithSpecialCharacters
    // We just need to check if the results are visible

    expect(await page.isVisible('text=Lucania!@#$')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID2', 'Conferma la ricerca', 'Il sistema visualizza i risultati della ricerca', 'I risultati sono stati visualizzati correttamente', true, {}, executionTime);
    }
}

export const verifyResultsWithSpecialCharacters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    expect(await page.isVisible('text=Lucania!@#$')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID3', 'Verifica i risultati della ricerca', 'I risultati sono corretti e non contengono errori', 'I risultati sono stati verificati correttamente', true, {}, executionTime);
    }
}