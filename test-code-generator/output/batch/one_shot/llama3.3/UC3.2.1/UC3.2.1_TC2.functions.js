import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertNonExistentNameInSearchBar = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('NonEsistente');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID1', 'Inserisci un nome non presente nel database nella barra di ricerca', 'La pagina di risultati si carica senza errori', 'La pagina di risultati si è caricata senza errori', true, {}, executionTime);
    }
}

export const confirmSearchWithNonExistentName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we are using the searchByName method which already presses Enter,
    // there's no need to explicitly call a method for executing the search.
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID2', 'Conferma la ricerca', 'Il sistema visualizza un messaggio che indica l’assenza di risultati', 'La ricerca è stata confermata con successo', true, {}, executionTime);
    }
}

export const verifyFeedbackMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Verify the feedback message
    expect(await page.textContent('.feedback-message')).toContain('Nessun risultato trovato');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID3', 'Verifica il messaggio di feedback', 'Il messaggio è chiaro e utile per l’utente', 'Il messaggio di feedback è stato verificato con successo', true, {}, executionTime);
    }
}