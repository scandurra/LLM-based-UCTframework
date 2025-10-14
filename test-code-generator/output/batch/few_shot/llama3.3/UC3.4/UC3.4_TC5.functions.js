import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionTC5 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAndAuthenticate(page, null);
    await selectCensusSheetMenu(page, null);

    expect(page.url()).toBe(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4_TC5_ID1', 'Accedi alla sezione delle schede censimento', 'La lista delle schede censimento è visibile', 'La lista delle schede censimento è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const cancelSelectedAction = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioniButton();

    // Assuming the first action can be selected
    await censusSheetPage.page.locator('.text-start > .btn').first().click();

    await censusSheetPage.page.locator('text=Annulla').click();

    expect(censusSheetPage.page.locator('text=Azioni selezionate')).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4_TC5_ID2', 'Seleziona un’azione e poi annulla la selezione', 'Il sistema annulla l’azione senza errori', 'L\'azione è stata annullata correttamente', true, {}, executionTime);
    }
}