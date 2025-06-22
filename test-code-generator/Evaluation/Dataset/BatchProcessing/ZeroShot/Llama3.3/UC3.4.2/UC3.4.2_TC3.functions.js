import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const selectDeleteNonExistingOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    // Simulate deletion of non-existing sheet
    await page.click('text="Elimina"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC3_ID1', 'Seleziona l\'operazione di cancellazione di una scheda censimento non esistente', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('text="Scheda non trovata"')).toBeTruthy();
}

export const confirmNonExistingDeletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Simulate click on confirm button
    await page.click('text="Conferma"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC3_ID2', 'Tenta di confermare l\'eliminazione', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('text="Errore durante l\'eliminazione"')).toBeTruthy();
}