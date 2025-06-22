import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSection = async function(page, reporter) {
    await selectCensusSheetMenu(page, null);
    if (reporter) {
        reporter.addStep('UC3.4.4_TC3_ID1', 'Accedi alla sezione delle schede censimento', true, true, true, {}, 0);
    }
    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const selectMultipleSchede = async function(page, reporter) {
    // TO DO: implement the logic to select multiple schede
    if (reporter) {
        reporter.addStep('UC3.4.4_TC3_ID2', 'Seleziona più schede per il congelamento', true, true, true, {}, 0);
    }
}

export const confirmCongelamentoMultipleSchede = async function(page, reporter) {
    // TO DO: implement the logic to confirm the congelamento of multiple schede
    if (reporter) {
        reporter.addStep('UC3.4.4_TC3_ID3', 'Conferma il congelamento delle schede selezionate', true, true, true, {}, 0);
    }
}

export const verifyStatoSchede = async function(page, reporter) {
    // TO DO: implement the logic to verify the stato of multiple schede
    if (reporter) {
        reporter.addStep('UC3.4.4_TC3_ID4', 'Verifica lo stato di tutte le schede dopo il congelamento', true, true, true, {}, 0);
    }
}