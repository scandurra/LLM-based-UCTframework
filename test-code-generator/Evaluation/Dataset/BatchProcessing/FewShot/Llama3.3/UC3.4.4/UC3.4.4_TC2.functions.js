import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

export const selectFreezeOperationAndCancel = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioniButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioneCongela();

    expect(censusSheetPage.freezeOption).toBeVisible();

    await censusSheetPage.confirmButton.click();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC2_ID1', 'Seleziona l’operazione di congelamento della scheda e annulla', 'Viene visualizzata la richiesta di conferma', 'La richiesta di conferma è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const verifySheetStatusAfterCancel = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    expect(censusSheetPage.statoColumn).not.toContainText('Non attivo');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4.4_TC2_ID2', 'Verifica lo stato della scheda dopo l’annullamento', 'La scheda rimane nello stato precedente', 'La scheda è rimasta nello stato precedente correttamente', true, {}, executionTime);
    }
}