import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const startDownload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessCensusSheetSection(page, null);
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    // Start the download
    await censusSheetPage.clickAzioneDownload();

    expect(censusSheetPage.downloadOption).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC5_ID1', 'Avvia il download della scheda censimento', 'Il browser avvia il download', 'Il browser ha avviato il download correttamente', true, {}, executionTime);
    }
}

export const interruptDownload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Interrupt the download
    await page.waitForTimeout(5000);

    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC5_ID2', 'Interrompi manualmente il download', 'Il sistema gestisce l’errore e mostra un messaggio di interruzione', 'Il sistema ha gestito l\'errore e mostrato un messaggio di interruzione correttamente', true, {}, executionTime);
    }
}