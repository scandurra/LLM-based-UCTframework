import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectCommunes, selectKPI, confirmRequest } from './UC2.4_TC1.functions.js';

import { navigateToDashboard } from '../UC2/UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC1", "Selezione di comuni e KPI validi per benchmarking");
    
    // Reuse existing method in the prompt without redefining them
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifySuccessMessage(page, null);
    
    await navigateToDashboard(page, reporter);  // Navigate to dashboard page
    
    await selectCommunes(page, reporter);  // Select communes
    await selectKPI(page, reporter);  // Select KPI
    await confirmRequest(page, reporter);  // Confirm request
    
    // Include Playwright assertions
    expect(passFail).toBeTruthy();
})