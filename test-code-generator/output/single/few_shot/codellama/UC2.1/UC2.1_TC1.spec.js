import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickOnDownloadPDFButton, confirmDownloadRequest, verifySuccessMessage } from './UC2.1_TC1.functions.js';

// Reuse existing method in the prompt without redefining them
import { navigateToDashboard } from '../UC2/UC2_TC1.functions.js';

test("UC2_TC1 - Download PDF con successo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Download PDF con successo");
    
    // Reuse existing method in the prompt without redefining them
    await navigateToDashboard(page, null);
    
    await clickOnDownloadPDFButton(page, reporter);
    await confirmDownloadRequest(page, reporter);
    await verifySuccessMessage(page, reporter);
    
    // Include Playwright assertions
    expect(passFail).toBeTruthy();
})