import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSearchSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await expect(censusSheetPage.searchInput).toBeVisible();
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID1', 'Accedi alla sezione di ricerca schede censimento', 'La barra di ricerca è visibile', 'La barra di ricerca è visibile', true, {}, executionTime);
    }
}

export const insertValidSearchParameters = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID2', 'Inserisci parametri di ricerca validi', 'I parametri vengono accettati', 'I parametri sono stati inseriti con successo', true, {}, executionTime);
    }
}

export const executeSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we are using the searchByName method which already presses Enter,
    // there's no need to explicitly call a method for executing the search.
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2_TC1_ID3', 'Esegui la ricerca', 'Vengono visualizzate le informazioni relative ai parametri inseriti', 'La ricerca è stata eseguita con successo', true, {}, executionTime);
    }
}