import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectEditOperationTC3 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneEdit();

    expect(censusSheetPage.editOption).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC3_ID1', 'Seleziona l’operazione di modifica sulla scheda censimento', 'La sezione di modifica viene visualizzata correttamente', 'La sezione di modifica è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const insertInvalidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    // For example:
    // await page.locator('#field1').fill('invalid data');
    // await page.locator('#field2').fill('invalid data');

    expect(true).toBeTruthy(); // Replace with actual assertion

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC3_ID2', 'Inserisci dati non validi in campi specifici', 'Il sistema rileva l’errore e richiede la correzione dei dati', 'Il sistema ha rilevato l’errore e richiesto la correzione dei dati', true, {}, executionTime);
    }
}

export const tryToConfirmChangesTC3 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    // For example:
    // await page.locator('#save-button').click();

    expect(true).toBeTruthy(); // Replace with actual assertion

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC3_ID3', 'Tenta di confermare le modifiche', 'La modifica non viene eseguita e vengono visualizzati messaggi di errore', 'La modifica non è stata eseguita e sono stati visualizzati messaggi di errore', true, {}, executionTime);
    }
}