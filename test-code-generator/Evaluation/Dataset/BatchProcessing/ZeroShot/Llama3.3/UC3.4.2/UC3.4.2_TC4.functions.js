import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const selectMultipleDeleteOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    // Simulate selection of multiple sheets
    await page.click('text="Seleziona tutto"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC4_ID1', 'Seleziona più schede censimento per l\'eliminazione', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('text="Elimina selezionati"')).toBeTruthy();
}

export const confirmMultipleDeletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Simulate click on confirm button
    await page.click('text="Conferma"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC4_ID2', 'Conferma l\'eliminazione di tutte le schede indicate', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('text="Eliminazione completata"')).toBeTruthy();
}