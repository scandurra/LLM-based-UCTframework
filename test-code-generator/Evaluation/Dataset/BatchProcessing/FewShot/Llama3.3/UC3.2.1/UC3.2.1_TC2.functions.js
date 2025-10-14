import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const insertNonExistingName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.searchByName('NonExistingName');

    expect(await page.isVisible('text=Nessun risultato trovato')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID1', 'Inserisci un nome non presente nel database nella barra di ricerca', 'La pagina di risultati si carica senza errori', 'La pagina di risultati è stata caricata correttamente', true, {}, executionTime);
    }
}

export const confirmSearchNonExisting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we already executed the search in insertNonExistingName
    // We just need to check if the results are visible

    expect(await page.isVisible('text=Nessun risultato trovato')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID2', 'Conferma la ricerca', 'Il sistema visualizza un messaggio che indica l’assenza di risultati', 'Il messaggio è stato visualizzato correttamente', true, {}, executionTime);
    }
}

export const verifyFeedbackMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    expect(await page.isVisible('text=Nessun risultato trovato')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC2_ID3', 'Verifica il messaggio di feedback', 'Il messaggio è chiaro e utile per l’utente', 'Il messaggio è stato visualizzato correttamente', true, {}, executionTime);
    }
}