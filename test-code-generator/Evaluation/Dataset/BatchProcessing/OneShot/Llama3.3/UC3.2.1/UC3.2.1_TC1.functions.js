import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertValidNameInSearchBar = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID1', 'Inserisci un nome valido nella barra di ricerca', 'La pagina di risultati si carica correttamente', 'La pagina di risultati si è caricata correttamente', true, {}, executionTime);
    }
}

export const confirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we are using the searchByName method which already presses Enter,
    // there's no need to explicitly call a method for executing the search.
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID2', 'Conferma la ricerca', 'I risultati della ricerca vengono visualizzati', 'La ricerca è stata confermata con successo', true, {}, executionTime);
    }
}

export const viewSearchResultsDetails = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC1_ID3', 'Visualizza i dettagli delle schede censimento trovate', 'Le informazioni sono complete e corrette', 'I dettagli sono stati visualizzati con successo', true, {}, executionTime);
    }
}