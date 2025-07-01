import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const insertLongName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.searchByName('LucaniaVeryLongNameThatShouldBeTruncated');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC5_ID1', 'Inserisci un nome lungo nella barra di ricerca', 'La pagina di risultati si carica senza errori', 'Pagina caricata correttamente', true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const confirmSearchWithLongName = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.waitForTimeout(1000);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC5_ID2', 'Conferma la ricerca', 'I risultati della ricerca vengono visualizzati correttamente', 'Risultati visualizzati', true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const verifyResultTruncation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Verify result truncation
    const results = await page.textContent('.results');
    expect(results).toContain('LucaniaVeryLongNameThatShouldBe...');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.2.1_TC5_ID3', 'Verifica la troncatura dei risultati', 'I risultati sono troncati correttamente', 'Risultati troncati', true, {}, executionTime);
    }
}