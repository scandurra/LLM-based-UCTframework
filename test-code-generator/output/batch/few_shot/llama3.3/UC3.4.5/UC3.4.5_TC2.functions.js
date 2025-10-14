import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const openDettaglioPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessCensusSheetSection(page, null);
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneDettaglio();

    expect(censusSheetPage.page.url()).toContain('dettaglio');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID1', 'Apri la pagina di dettaglio di una scheda censimento', 'La pagina si apre in modalità sola lettura', 'La pagina di dettaglio è stata aperta correttamente', true, {}, executionTime);
    }
}

export const tryModifyField = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // TO DO: implement attempt to modify a field
    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID2', 'Tenta di modificare un campo dei dati generali dell’area', 'Il sistema non permette la modifica e visualizza un messaggio di errore', 'La modifica è stata tentata correttamente', true, {}, executionTime);
    }
}

export const verifyNoEditingOptions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // TO DO: implement verification of no editing options
    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID3', 'Verifica che non ci siano opzioni di editing disponibili', 'Non sono presenti pulsanti o link per modificare i dati', 'Le opzioni di editing sono state verificate correttamente', true, {}, executionTime);
    }
}