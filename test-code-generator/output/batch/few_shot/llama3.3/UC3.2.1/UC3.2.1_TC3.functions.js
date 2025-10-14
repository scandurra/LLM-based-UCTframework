import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const leaveSearchFieldEmpty = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.searchByName('');

    expect(await page.isVisible('text=Campo obbligatorio')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID1', 'Lascia vuota la barra di ricerca e conferma', 'Il sistema segnala l’errore di campo obbligatorio', 'L\'errore è stato segnalato correttamente', true, {}, executionTime);
    }
}

export const verifyErrorMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    expect(await page.isVisible('text=Campo obbligatorio')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID2', 'Verifica il messaggio di errore', 'Il messaggio è chiaro e indica la necessità di inserire il nome', 'Il messaggio è stato visualizzato correttamente', true, {}, executionTime);
    }
}

export const insertValidNameAfterError = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);

    await censusSheetPage.searchByName('Lucania');

    expect(await page.isVisible('text=Lucania')).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC3_ID3', 'Inserisci un nome valido e ripeti la ricerca', 'La ricerca procede correttamente', 'La ricerca è stata eseguita correttamente', true, {}, executionTime);
    }
}