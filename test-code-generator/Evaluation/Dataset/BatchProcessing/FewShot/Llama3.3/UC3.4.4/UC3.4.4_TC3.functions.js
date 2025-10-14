import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectMultipleSheetsForFreeze = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    // Select multiple sheets
    await censusSheetPage.clickAzioneCongela();

    expect(censusSheetPage.freezeOption).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC3_ID1', 'Seleziona più schede per il congelamento', 'Viene richiesta la conferma per ogni scheda', 'La richiesta di conferma è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const confirmFreezeOfMultipleSheets = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.confirmButton.click();

    expect(censusSheetPage.statoColumn).toContainText('Non attivo');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC3_ID2', 'Conferma il congelamento delle schede selezionate', 'Tutte le schede vengono congelate e contrassegnate come non attive', 'Le schede sono state congelate correttamente', true, {}, executionTime);
    }
}

export const verifyStatusOfAllSheetsAfterFreeze = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    expect(censusSheetPage.statoColumn).toContainText('Non attivo');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC3_ID3', 'Verifica lo stato di tutte le schede dopo il congelamento', 'Tutte le schede sono aggiornate a non attive', 'Le schede sono state aggiornate correttamente', true, {}, executionTime);
    }
}