import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

export const selectDeleteOperationTC2 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDelete();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID1', 'Seleziona l\'operazione di cancellazione di una scheda censimento esistente', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.confirmDeleteButton.isVisible()).toBeTruthy();
}

export const cancelDeletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickConfirmAzioneDelete();

    // Simulate click on cancel button
    await page.click('text="Annulla"');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC2_ID2', 'Annulla l\'eliminazione della scheda indicata', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.confirmButton.isVisible()).toBeFalsy();
}