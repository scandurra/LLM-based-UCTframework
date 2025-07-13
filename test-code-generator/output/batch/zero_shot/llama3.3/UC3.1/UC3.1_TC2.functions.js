import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionWithoutData = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC2_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento senza dati', true, true, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2C_CTS_URL);
}

export const verifyNoDataMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since we don't have the exact implementation details of the no-data message,
    // we'll assume it's visible and contains a specific text.
    const noDataMessage = await page.querySelector('text="No data available"');
    expect(noDataMessage).toBeTruthy();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC2_ID2', 'Verifica la presenza del messaggio di assenza di dati', true, true, true, {}, executionTime);
    }
}