import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessEmptyCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAndAuthenticate(page, null);
    await selectCensusSheetMenu(page, null);

    expect(page.url()).toBe(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC2_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento senza dati', 'Viene visualizzato un messaggio che indica l’assenza di dati', 'Il messaggio è stato visualizzato correttamente', true, {}, executionTime);
    }
}

export const verifyNoDataMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since there is no specific method to check for the "no data" message,
    // we will just verify that the page contains a certain text.
    expect(await page.textContent('body')).toContain('No data available');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC2_ID2', 'Verifica la presenza del messaggio di assenza di dati', 'Il messaggio è chiaro e visibile', 'Il messaggio è stato verificato correttamente', true, {}, executionTime);
    }
}