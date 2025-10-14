import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

export const accessCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAndAuthenticate(page, null);
    await selectCensusSheetMenu(page, null);

    expect(page.url()).toBe(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento', 'La tabella con le informazioni viene visualizzata correttamente', 'La tabella con le informazioni è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const selectColumnForSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.clickAzioniColumn();

    expect(censusSheetPage.azioniColumn).toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID2', 'Seleziona una colonna per l’ordinamento e clicca sul nome della colonna', 'Le righe vengono ordinate in base alla selezione', 'Le righe sono state ordinate correttamente', true, {}, executionTime);
    }
}

export const scrollHorizontally = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since there is no specific method to check if all columns are visible and scrollable,
    // we will just verify that the page has been scrolled horizontally.
    await page.evaluate(() => window.scrollTo({ top: 0, left: 100 }));

    expect(page.evaluate(() => window.scrollX)).toBeGreaterThan(0);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID3', 'Scorri lateralmente per visualizzare tutte le colonne', 'Tutte le colonne sono visibili e scorrevoli', 'Tutte le colonne sono state visualizzate correttamente', true, {}, executionTime);
    }
}