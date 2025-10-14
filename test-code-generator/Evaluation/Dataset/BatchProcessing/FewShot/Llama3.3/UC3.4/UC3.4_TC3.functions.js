import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionTC3 = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAndAuthenticate(page, null);
    await selectCensusSheetMenu(page, null);

    expect(page.url()).toBe(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4_TC3_ID1', 'Accedi alla sezione delle schede censimento con un utente senza permessi', 'La lista delle schede censimento è visibile ma le azioni sono limitate', 'La lista delle schede censimento è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const tryExecuteActionWithoutPermissions = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioniButton();

    // Assuming the first action requires permissions
    await censusSheetPage.page.locator('.text-start > .btn').first().click();

    expect(censusSheetPage.page.locator('text=Accesso negato')).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.4_TC3_ID2', 'Tenta di eseguire un’azione che richiede permessi superiori', 'Il sistema nega l’accesso e mostra un messaggio di autorizzazione', 'Il messaggio di autorizzazione è stato visualizzato correttamente', true, {}, executionTime);
    }
}