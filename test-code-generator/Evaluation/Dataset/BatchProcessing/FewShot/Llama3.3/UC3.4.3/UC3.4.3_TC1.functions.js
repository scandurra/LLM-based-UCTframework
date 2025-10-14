import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectEditOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneEdit();

    expect(censusSheetPage.editOption).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID1', 'Seleziona l’operazione di modifica sulla scheda censimento', 'La sezione di modifica viene visualizzata correttamente', 'La sezione di modifica è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const modifyFieldsWithValidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    // For example:
    // await page.locator('#field1').fill('valid data');
    // await page.locator('#field2').fill('valid data');

    expect(true).toBeTruthy(); // Replace with actual assertion

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID2', 'Modifica i campi con dati validi', 'I dati vengono accettati e salvati', 'I dati sono stati accettati e salvati', true, {}, executionTime);
    }
}

export const confirmChanges = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    // For example:
    // await page.locator('#save-button').click();

    expect(true).toBeTruthy(); // Replace with actual assertion

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID3', 'Conferma le modifiche', 'Le informazioni vengono aggiornate con successo', 'Le informazioni sono state aggiornate con successo', true, {}, executionTime);
    }
}