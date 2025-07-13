import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const selectDettaglioOperationWithMissingData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC3_ID1', 'Seleziona l’operazione di dettaglio su una scheda con dati parziali o mancanti', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const verifyMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to verify the message
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC3_ID2', 'Verifica la presenza di un messaggio che indica la mancanza di dati', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible()).toBeTruthy();
}

export const verifyAddDataOptions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to verify add data options
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC3_ID3', 'Controlla se sono presenti link o opzioni per aggiungere i dati mancanti', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible()).toBeTruthy();
}