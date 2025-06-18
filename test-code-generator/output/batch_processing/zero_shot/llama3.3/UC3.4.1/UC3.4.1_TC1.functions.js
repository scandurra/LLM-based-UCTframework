import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const selectDownloadOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneButton();
    await censusSheetPage.clickAzioneDownload();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID1', 'Seleziona l’operazione di download della scheda censimento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const waitDownloadCompletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Wait for the download to complete
    await page.waitForTimeout(5000);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID2', 'Attiendi la fine del download', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}