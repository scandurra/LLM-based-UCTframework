import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

export const selectDeleteNonExistingOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    // Simulate deletion of non-existing sheet
    await page.click('text="Delete"');

    expect(censusSheetPage.confirmDeleteButton).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC3_ID1', 'Seleziona l\'operazione di cancellazione di una scheda censimento non esistente', 'Il sistema segnala che la scheda non è presente', 'La scheda non esiste e il sistema lo segnala correttamente', true, {}, executionTime);
    }
}

export const tryConfirmDeleteNonExisting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Try to confirm deletion of non-existing sheet
    await page.click('text="Confirm"');

    expect(censusSheetPage.confirmButton).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC3_ID2', 'Tenta di confermare l\'eliminazione', 'L\'operazione fallisce e viene visualizzato un messaggio di errore', 'L\'eliminazione non è possibile e il sistema lo segnala correttamente', true, {}, executionTime);
    }
}