import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToDashboard } from '../UC2/UC2_TC1.functions.js';

import { selectComuneAndParameters, applySearch, viewDetails } from './UC2.2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Ricerca impianti di illuminazione con parametri validi");
    
    // Reuse existing method in the prompt without redefining them
    await navigateToDashboard(page, null);
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifySuccessMessage(page, null);
    
    await selectComuneAndParameters(page, reporter);
    await applySearch(page, reporter);
    await viewDetails(page, reporter);
    
    // Include Playwright assertions
    expect(passFail).toBeTruthy();
})