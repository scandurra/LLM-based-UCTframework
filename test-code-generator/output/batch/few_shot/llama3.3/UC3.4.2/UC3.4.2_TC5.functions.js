import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectDeleteOperationTC5 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneDelete();

    expect(censusSheetPage.confirmDeleteButton).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC5_ID1', 'Seleziona l\'operazione di cancellazione di una scheda censimento esistente', 'Il messaggio di conferma è chiaro e comprensibile', 'La conferma dell\'eliminazione è stata richiesta correttamente', true, {}, executionTime);
    }
}

export const confirmDeleteTC5 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickConfirmAzioneDelete();

    expect(censusSheetPage.confirmButton).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.2_TC5_ID2', 'Conferma l\'eliminazione della scheda indicata', 'Il sistema elimina la scheda e visualizza un messaggio di conferma', 'La scheda è stata eliminata correttamente', true, {}, executionTime);
    }
}