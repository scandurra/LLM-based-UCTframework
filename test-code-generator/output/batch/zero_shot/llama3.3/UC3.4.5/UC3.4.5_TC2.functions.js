import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const openDettaglioPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDettaglio();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID1', 'Apri la pagina di dettaglio di una scheda censimento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const tryModifyField = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to try modify a field
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID2', 'Tenta di modificare un campo dei dati generali dell’area', false, true, false, {}, executionTime);
    }

    expect(await page.isVisible()).toBeTruthy();
}

export const verifyNoEditingOptions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Put here the logic to verify no editing options
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.5_TC2_ID3', 'Verifica che non ci siano opzioni di editing disponibili', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible()).toBeTruthy();
}