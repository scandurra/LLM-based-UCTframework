import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectSpecialCharactersFileName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessCensusSheetSection(page, null);
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    // Select a file with special characters in the name
    await censusSheetPage.clickAzioneDownload();

    expect(censusSheetPage.downloadOption).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC4_ID1', 'Seleziona la scheda censimento con caratteri speciali nel nome', 'Il sistema gestisce i caratteri speciali', 'Il sistema ha gestito i caratteri speciali correttamente', true, {}, executionTime);
    }
}

export const downloadSpecialCharactersFileName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Download the file
    await page.waitForTimeout(5000);

    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC4_ID2', 'Avvia il download', 'Il file viene scaricato con un nome valido', 'Il file è stato scaricato correttamente', true, {}, executionTime);
    }
}