import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const selectSpecialCharactersFileName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.search("filename!@#$%^&*()");

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC4_ID1', 'Seleziona la scheda censimento con caratteri speciali nel nome', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const downloadSpecialCharactersFileName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneButton();
    await censusSheetPage.clickAzioneDownload();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC4_ID2', 'Avvia il download', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}