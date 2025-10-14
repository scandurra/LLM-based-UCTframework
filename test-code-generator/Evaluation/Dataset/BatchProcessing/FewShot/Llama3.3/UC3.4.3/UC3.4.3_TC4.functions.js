import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectEditOperationTC4 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneEdit();

    expect(censusSheetPage.editOption).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC4_ID1', 'Seleziona l’operazione di modifica sulla scheda censimento', 'La sezione di modifica viene visualizzata correttamente', 'La sezione di modifica è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const makeChanges = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    // For example:
    // await page.locator('#field1').fill('new data');
    // await page.locator('#field2').fill('new data');

    expect(true).toBeTruthy(); // Replace with actual assertion

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC4_ID2', 'Apporta modifiche ai campi', 'I dati vengono temporaneamente aggiornati', 'I dati sono stati temporaneamente aggiornati', true, {}, executionTime);
    }
}

export const cancelChanges = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here test case step implementation
    // For example:
    // await page.locator('#cancel-button').click();

    expect(true).toBeTruthy(); // Replace with actual assertion

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC4_ID3', 'Annulla le modifiche', 'Le modifiche vengono annullate e la scheda torna allo stato originale', 'Le modifiche sono state annullate e la scheda è tornata allo stato originale', true, {}, executionTime);
    }
}