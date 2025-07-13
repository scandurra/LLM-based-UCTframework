import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSearchSectionMultiple = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await expect(censusSheetPage.searchInput).toBeVisible();
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC4_ID1', 'Accedi alla sezione di ricerca schede censimento', 'La barra di ricerca è visibile', 'La barra di ricerca è visibile', true, {}, executionTime);
    }
}

export const insertMultipleValidSearchParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchInput.fill('Lucania data');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC4_ID2', 'Inserisci molti parametri di ricerca validi', 'I parametri vengono accettati', 'I parametri multipli sono stati inseriti con successo', true, {}, executionTime);
    }
}

export const executeSearchWithMultipleParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we are using the fill method which does not automatically press Enter,
    // we need to explicitly call a method for executing the search.
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchInput.press('Enter');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC4_ID3', 'Esegui la ricerca', 'Vengono visualizzate le informazioni relative ai parametri inseriti', 'La ricerca è stata eseguita con successo', true, {}, executionTime);
    }
}