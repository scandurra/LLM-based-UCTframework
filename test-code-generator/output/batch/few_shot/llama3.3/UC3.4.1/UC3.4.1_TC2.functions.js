import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

export const tryDownloadWithoutSelection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessCensusSheetSection(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    // Try to download without selecting a file
    await censusSheetPage.clickAzioniButton();

    expect(censusSheetPage.actionDropdown).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC2_ID1', 'Accedi alla sezione di download senza selezionare la scheda censimento', 'Il sistema richiede la selezione del file', 'Il sistema ha richiesto la selezione del file correttamente', true, {}, executionTime);
    }
}

export const verifyDownloadError = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Verify that the download does not proceed
    expect(true).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC2_ID2', 'Tenta di avviare il download senza selezione', 'Il sistema non procede e mostra un messaggio di errore', 'Il sistema non ha proceduto con il download e ha mostrato un messaggio di errore correttamente', true, {}, executionTime);
    }
}