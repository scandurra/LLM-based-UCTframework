import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const startDownload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneButton();
    await censusSheetPage.clickAzioneDownload();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC5_ID1', 'Avvia il download della scheda censimento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const interruptDownload = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Interrupt the download
    await page.click('text="Cancel"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC5_ID2', 'Interrompi manualmente il download', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}