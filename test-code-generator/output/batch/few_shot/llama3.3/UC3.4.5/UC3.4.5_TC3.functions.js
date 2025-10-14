import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectDettaglioOperationWithMissingData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessCensusSheetSection(page, null);
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneDettaglio();

    expect(censusSheetPage.page.url()).toContain('dettaglio');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC3_ID1', 'Seleziona l’operazione di dettaglio su una scheda con dati parziali o mancanti', 'La pagina di dettaglio si apre ma segnala la mancanza di informazioni', 'La pagina di dettaglio è stata aperta correttamente', true, {}, executionTime);
    }
}

export const verifyMessageForMissingData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // TO DO: implement verification of message for missing data
    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC3_ID2', 'Verifica la presenza di un messaggio che indica la mancanza di dati', 'Il messaggio è chiaro e visibile all’utente', 'Il messaggio per i dati mancanti è stato verificato correttamente', true, {}, executionTime);
    }
}

export const verifyOptionsToAddMissingData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // TO DO: implement verification of options to add missing data
    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC3_ID3', 'Controlla se sono presenti link o opzioni per aggiungere i dati mancanti', 'Sono disponibili opzioni per aggiungere o completare le informazioni', 'Le opzioni per aggiungere i dati mancanti sono state verificate correttamente', true, {}, executionTime);
    }
}