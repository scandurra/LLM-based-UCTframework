import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionForEditWithCancel = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC4_ID1', 'Accedi alla sezione delle schede censimento per modifica con annullamento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const clickAzioneEditButtonWithCancel = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await accessCensusSheetSectionForEditWithCancel(page, null);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.clickAzioneEdit();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC4_ID2', 'Clicca sul tasto azioni di modifica di una scheda censimento con annullamento', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.editOption.isVisible()).toBeTruthy();
}

export const makeChangesAndCancel = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Implement making changes and canceling
    // For demonstration purposes, assume we have a method to fill the form and then cancel
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.fillForm();
    await censusSheetPage.cancel();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.3_TC4_ID3', 'Apporta modifiche e annulla', true, true, true, {}, executionTime);
    }

    expect(await page.isVisible('#form-cancelled')).toBeTruthy();
}