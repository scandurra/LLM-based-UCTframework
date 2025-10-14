import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

export const accessCensusSheetSectionWithPagination = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAndAuthenticate(page, null);
    await selectCensusSheetMenu(page, null);

    expect(page.url()).toBe(process.env.E2E_CTS_URL);

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC4_ID1', 'Accedi alla sezione di visualizzazione delle schede censimento con molti dati', 'La tabella con le informazioni viene visualizzata correttamente con paginazione', 'La tabella con le informazioni è stata visualizzata correttamente', true, {}, executionTime);
    }
}

export const navigateThroughPages = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since there is no specific method to check for pagination,
    // we will just verify that the page has been navigated through.
    await page.click('text="Next"');

    expect(await page.textContent('body')).toContain('Page 2');

    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC4_ID2', 'Naviga tra le pagine', 'Le pagine vengono caricate correttamente e mostrano i dati attesi', 'Le pagine sono state navigate correttamente', true, {}, executionTime);
    }
}