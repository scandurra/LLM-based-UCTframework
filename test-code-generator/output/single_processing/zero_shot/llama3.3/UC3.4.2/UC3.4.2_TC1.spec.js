import { test, expect } from '@playwright/test';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3/UC3_TC1.functions.js';

import { selectDeleteOperation, confirmDeletion } from './UC3.4.2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4.2_TC1 - Elimina scheda censimento con conferma", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC1 - Elimina scheda censimento con conferma");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await clickAzioneButton(page, reporter);
    await selectDeleteOperation(page, reporter);
    await confirmDeletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});