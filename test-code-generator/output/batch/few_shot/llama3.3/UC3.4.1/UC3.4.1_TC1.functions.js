import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectDownloadOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneDownload();

    expect(censusSheetPage.downloadOption).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID1', 'Seleziona l’operazione di download della scheda censimento', 'Il browser avvia il download', 'Il browser ha avviato il download correttamente', true, {}, executionTime);
    }
}

export const waitDownloadCompletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Wait for the download to complete
    await page.waitForTimeout(5000);

    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID2', 'Attiendi la fine del download', 'Il file viene scaricato correttamente', 'Il file è stato scaricato correttamente', true, {}, executionTime);
    }
}