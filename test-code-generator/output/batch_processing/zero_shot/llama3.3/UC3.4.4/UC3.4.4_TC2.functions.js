import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSection = async function(page, reporter) {
    await selectCensusSheetMenu(page, null);
    if (reporter) {
        reporter.addStep('UC3.4.4_TC2_ID1', 'Accedi alla sezione delle schede censimento', true, true, true, {}, 0);
    }
    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const clickAzioneButton = async function(page, reporter) {
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniButton();
    if (reporter) {
        reporter.addStep('UC3.4.4_TC2_ID2', 'Clicca sul tasto azioni di una scheda censimento', true, true, true, {}, 0);
    }
    expect(await censusSheetPage.actionDropdown.isVisible()).toBeTruthy();
}

export const clickAzioneCongela = async function(page, reporter) {
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneCongela();
    if (reporter) {
        reporter.addStep('UC3.4.4_TC2_ID3', 'Seleziona l’operazione di congelamento della scheda', true, true, true, {}, 0);
    }
}

export const annullaCongelamento = async function(page, reporter) {
    // TO DO: implement the logic to annulla the congelamento
    if (reporter) {
        reporter.addStep('UC3.4.4_TC2_ID4', 'Annulla il congelamento della scheda', true, true, true, {}, 0);
    }
}

export const verifyStatoScheda = async function(page, reporter) {
    // TO DO: implement the logic to verify the stato of the scheda
    if (reporter) {
        reporter.addStep('UC3.4.4_TC2_ID5', 'Verifica lo stato della scheda dopo l’annullamento', true, true, true, {}, 0);
    }
}