import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const leaveSearchBarEmpty = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID1', 'Lascia vuota la barra di ricerca e conferma', 'Il sistema segnala l’errore di campo obbligatorio', 'La barra di ricerca è stata lasciata vuota con successo', true, {}, executionTime);
    }
}

export const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Verify the error message
    expect(await page.textContent('.error-message')).toContain('Il campo nome è obbligatorio');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID2', 'Verifica il messaggio di errore', 'Il messaggio è chiaro e indica la necessità di inserire il nome', 'Il messaggio di errore è stato verificato con successo', true, {}, executionTime);
    }
}

export const insertValidNameAndRepeatSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('Lucania');
    
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID3', 'Inserisci un nome valido e ripeti la ricerca', 'La ricerca procede correttamente', 'La ricerca è stata ripetuta con successo', true, {}, executionTime);
    }
}