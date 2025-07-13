import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToDashboard } from './UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Apertura della dashboard con utente autorizzato");
    
    // Reuse existing method in the prompt without redefining them
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifySuccessMessage(page, null);
    
    await navigateToDashboard(page, reporter);
    
    // Include Playwright assertions
    expect(passFail).toBeTruthy();
})