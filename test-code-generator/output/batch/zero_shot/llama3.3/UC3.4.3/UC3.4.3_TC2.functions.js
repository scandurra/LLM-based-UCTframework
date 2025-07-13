import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionForEditWithMissingData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC2_ID1', 'Accedi alla sezione delle schede censimento per modifica con dati mancanti', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const clickAzioneEditButtonWithMissingData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await accessCensusSheetSectionForEditWithMissingData(page, null);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneEdit();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC2_ID2', 'Clicca sul tasto azioni di modifica di una scheda censimento con dati mancanti', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.editOption.isVisible()).toBeTruthy();
}

export const leaveRequiredFieldsEmpty = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement leaving required fields empty
    // For demonstration purposes, assume we have a method to clear the form
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clearForm();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC2_ID3', 'Lascia vuoti campi obbligatori', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('#form-error')).toBeTruthy();
}

export const attemptToConfirmChangesWithMissingData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement attempt to confirm changes with missing data
    // For demonstration purposes, assume we have a method to submit the form
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.submitForm();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC2_ID4', 'Tenta di confermare le modifiche con dati mancanti', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('#form-error')).toBeTruthy();
}