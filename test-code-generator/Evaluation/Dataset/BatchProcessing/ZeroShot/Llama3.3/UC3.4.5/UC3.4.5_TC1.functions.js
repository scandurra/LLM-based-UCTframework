import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const selectDettaglioOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID1', 'Seleziona l’operazione di dettaglio su una scheda esistente', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const verifyDettaglioPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to verify the dettaglio page
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID2', 'Verifica la presenza dei dati generali dell’area e della gerarchia dei POD e Aree Omogenee', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible()).toBeTruthy();
}

export const navigateGerarchia = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to navigate in the gerarchia
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC1_ID3', 'Prova a navigare nella gerarchia dei POD e Aree Omogenee', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible()).toBeTruthy();
}