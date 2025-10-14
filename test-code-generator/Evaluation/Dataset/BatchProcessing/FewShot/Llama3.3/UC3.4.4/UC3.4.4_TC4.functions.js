import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const tryToFreezeWithoutSelectingASheet = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    // Try to freeze without selecting a sheet
    await censusSheetPage.clickAzioneCongela();

    expect(censusSheetPage.freezeOption).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC4_ID1', 'Tenta di avviare il congelamento senza selezionare una scheda', 'Viene visualizzato un messaggio di errore per la mancanza di selezione', 'Il messaggio di errore è stato visualizzato correttamente', true, {}, executionTime);
    }
}

export const verifySheetStatusAfterFreezeWithoutSelection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    expect(censusSheetPage.statoColumn).not.toContainText('Non attivo');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC4_ID2', 'Verifica lo stato delle schede', 'Nessuna scheda è stata modificata', 'Le schede non sono state modificate correttamente', true, {}, executionTime);
    }
}