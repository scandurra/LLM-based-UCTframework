import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionTC2 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAndAuthenticate(page, null);
    await selectCensusSheetMenu(page, null);

    expect(page.url()).toBe(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4_TC2_ID1', 'Accedi alla sezione delle schede censimento', 'La lista delle schede censimento è visibile', 'La lista delle schede censimento è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const clickNonSupportedAction = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioniButton();

    // Assuming the first action is not supported
    await censusSheetPage.page.locator('.text-start > .btn').first().click();

    expect(censusSheetPage.page.locator('text=Azioni non disponibili')).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4_TC2_ID2', 'Clicca su un’azione che non è supportata per la scheda selezionata', 'Il sistema mostra un messaggio di azione non disponibile', 'Il messaggio di azione non disponibile è stato visualizzato correttamente', true, {}, executionTime);
    }
}