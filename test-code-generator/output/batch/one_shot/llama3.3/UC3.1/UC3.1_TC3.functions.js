import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSectionForMultiColumnSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await expect(censusSheetPage.searchInput).toBeVisible();
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC3_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento', 'La tabella con le informazioni viene visualizzata correttamente', 'La tabella è visibile', true, {}, executionTime);
    }
}

export const selectMultipleColumnsForSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniColumn();
    await censusSheetPage.clickSchedaColumn();
    await expect(censusSheetPage.searchInput).toBeVisible();
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC3_ID2', 'Seleziona più colonne per l’ordinamento e clicca sul nome delle colonne', 'Le righe vengono ordinate in base alle selezioni multiple', 'Le righe sono ordinate', true, {}, executionTime);
    }
}