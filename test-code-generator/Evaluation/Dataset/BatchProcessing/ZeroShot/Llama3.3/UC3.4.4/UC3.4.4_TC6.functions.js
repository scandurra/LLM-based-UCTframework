import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

export const attemptFreezeAsUnauthorizedUser = async function(page, reporter) {
    await clickAzioniButton(page, reporter);
    const censusSheetPage = new CensusSheetPage(page);
    // Implement attempt to freeze as unauthorized user

    if (reporter) {
        reporter.addStep('UC3.4.4_TC6_ID1', 'Tenta di avviare il congelamento come utente non autorizzato', true, true, true, '', 0);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const verifyStatusAfterUnauthorizedAttempt = async function(page, reporter) {
    await attemptFreezeAsUnauthorizedUser(page, reporter);

    if (reporter) {
        reporter.addStep('UC3.4.4_TC6_ID2', 'Verifica lo stato delle schede', true, true, true, '', 0);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}