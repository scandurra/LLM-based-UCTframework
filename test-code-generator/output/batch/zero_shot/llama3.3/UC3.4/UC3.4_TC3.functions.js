import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionWithoutPermissions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4_TC3_ID1', 'Accedi alla sezione delle schede censimento con un utente senza permessi', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const tryExecuteAzioneWithoutPermissions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    await censusSheetPage.page.locator('[data-kt-cts-table-filter="action_requiring_permissions"]').first().click();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4_TC3_ID2', 'Tenta di eseguire un’azione che richiede permessi superiori', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.page.locator('text=Accesso negato').isVisible()).toBeTruthy();
}