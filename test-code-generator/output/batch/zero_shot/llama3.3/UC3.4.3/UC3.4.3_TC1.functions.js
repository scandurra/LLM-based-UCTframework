import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionForEdit = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID1', 'Accedi alla sezione delle schede censimento per modifica', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const clickAzioneEditButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await accessCensusSheetSectionForEdit(page, null);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneEdit();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID2', 'Clicca sul tasto azioni di modifica di una scheda censimento', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.editOption.isVisible()).toBeTruthy();
}

export const modifyFieldsWithValidData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement modification of fields with valid data
    // For demonstration purposes, assume we have a method to fill the form
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.fillFormWithValidData();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID3', 'Modifica i campi con dati validi', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('#form-submitted')).toBeTruthy();
}

export const confirmChanges = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement confirmation of changes
    // For demonstration purposes, assume we have a method to submit the form
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.submitForm();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC1_ID4', 'Conferma le modifiche', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('#changes-confirmed')).toBeTruthy();
}