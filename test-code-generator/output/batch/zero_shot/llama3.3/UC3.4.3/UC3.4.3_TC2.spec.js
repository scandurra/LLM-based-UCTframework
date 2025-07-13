import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSectionForEditWithMissingData, clickAzioneEditButtonWithMissingData, leaveRequiredFieldsEmpty, attemptToConfirmChangesWithMissingData } from './UC3.4.3_TC2.functions.js';

test("UC3.4.3_TC2 - Modifica scheda censimento con dati mancanti", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC2", "Modifica scheda censimento con dati mancanti");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSectionForEditWithMissingData(page, reporter);
    await clickAzioneEditButtonWithMissingData(page, reporter);
    await leaveRequiredFieldsEmpty(page, reporter);
    await attemptToConfirmChangesWithMissingData(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});