import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

export const selectMultipleDeleteOperations = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    // Simulate selection of multiple sheets for deletion
    await page.click('text="Select all"');

    expect(censusSheetPage.confirmDeleteButton).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC4_ID1', 'Seleziona più schede censimento per l\'eliminazione', 'Il sistema richiede conferma per ogni scheda selezionata', 'Le schede sono state selezionate correttamente', true, {}, executionTime);
    }
}

export const confirmMultipleDeletions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Confirm deletion of multiple sheets
    await page.click('text="Confirm"');

    expect(censusSheetPage.confirmButton).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC4_ID2', 'Conferma l\'eliminazione di tutte le schede indicate', 'Il sistema elimina tutte le schede e visualizza un messaggio di conferma', 'Le schede sono state eliminate correttamente', true, {}, executionTime);
    }
}