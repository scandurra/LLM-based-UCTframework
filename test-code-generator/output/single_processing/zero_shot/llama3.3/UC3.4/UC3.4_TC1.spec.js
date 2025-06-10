import { test, expect } from '@playwright/test';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4_TC1 - Visualizzazione azioni disponibili sulla scheda censimento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4_TC1 - Visualizzazione azioni disponibili sulla scheda censimento");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await clickAzioneButton(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});