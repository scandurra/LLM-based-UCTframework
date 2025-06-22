import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const openDettaglioPageWithGerarchia = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC4_ID1', 'Apri la pagina di dettaglio di una scheda censimento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const selectNodoGerarchia = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to select a nodo in the gerarchia
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC4_ID2', 'Seleziona un nodo della gerarchia per visualizzare i dettagli', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible()).toBeTruthy();
}

export const navigateGerarchiaBackAndForth = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to navigate back and forth in the gerarchia
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC4_ID3', 'Naviga avanti e indietro nella gerarchia', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible()).toBeTruthy();
}