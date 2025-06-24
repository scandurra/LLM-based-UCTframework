import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToDashboardAndScroll, sortTableByColumn, verifySorting } from './UC2.3_TC2.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC2_TC2 - Visualizzazione tabella dati generali con ordinamento personalizzato", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC2", "Visualizzazione tabella dati generali con ordinamento personalizzato");
    
    // Reuse existing method in the prompt without redefining them
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifySuccessMessage(page, null);
    
    await navigateToDashboardAndScroll(page, reporter);
    await sortTableByColumn(page, reporter);
    await verifySorting(page, reporter);
    
    // Include Playwright assertions
    expect(passFail).toBeTruthy();
})