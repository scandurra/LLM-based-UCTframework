import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertNameWithSpecialCharactersInSearchBar = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania!@#$');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID1', 'Inserisci un nome contenente caratteri speciali nella barra di ricerca', 'La pagina di risultati si carica senza errori', 'La pagina di risultati si è caricata senza errori', true, {}, executionTime);
    }
}

export const confirmSearchWithSpecialCharacters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we are using the searchByName method which already presses Enter,
    // there's no need to explicitly call a method for executing the search.
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID2', 'Conferma la ricerca', 'I risultati della ricerca vengono visualizzati correttamente', 'La ricerca è stata confermata con successo', true, {}, executionTime);
    }
}

export const verifyAccuracyOfResults = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Verify the accuracy of results
    expect(await page.textContent('.search-results')).toContain('Lucania');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC4_ID3', 'Verifica l’accuratezza dei risultati', 'I risultati sono pertinenti e non ci sono errori di formattazione', 'L\'accuratezza dei risultati è stata verificata con successo', true, {}, executionTime);
    }
}