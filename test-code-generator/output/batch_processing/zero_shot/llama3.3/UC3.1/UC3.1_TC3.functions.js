import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionForMultiColumnSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC3_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const selectMultipleColumnsForSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniColumn();
    await censusSheetPage.clickSchedaColumn();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC3_ID2', 'Seleziona più colonne per l’ordinamento e clicca sul nome delle colonne', true, true, true, {}, executionTime);
    }

    expect(await censusSheetPage.azioniColumn.isVisible()).toBeTruthy();
    expect(await censusSheetPage.schedaColumn.isVisible()).toBeTruthy();
}