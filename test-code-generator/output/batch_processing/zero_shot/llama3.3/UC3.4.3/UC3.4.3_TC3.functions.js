import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionForEditWithInvalidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC3_ID1', 'Accedi alla sezione delle schede censimento per modifica con dati non validi', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const clickAzioneEditButtonWithInvalidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await accessCensusSheetSectionForEditWithInvalidData(page, null);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneEdit();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC3_ID2', 'Clicca sul tasto azioni di modifica di una scheda censimento con dati non validi', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.editOption.isVisible()).toBeTruthy();
}

export const enterInvalidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement entering invalid data
    // For demonstration purposes, assume we have a method to fill the form with invalid data
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.fillFormWithInvalidData();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC3_ID3', 'Inserisci dati non validi in campi specifici', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('#form-error')).toBeTruthy();
}

export const attemptToConfirmChangesWithInvalidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement attempt to confirm changes with invalid data
    // For demonstration purposes, assume we have a method to submit the form
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.submitForm();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC3_ID4', 'Tenta di confermare le modifiche con dati non validi', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('#form-error')).toBeTruthy();
}