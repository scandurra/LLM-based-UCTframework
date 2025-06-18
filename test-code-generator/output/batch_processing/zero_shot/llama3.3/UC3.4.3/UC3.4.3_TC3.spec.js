import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSectionForEditWithInvalidData, clickAzioneEditButtonWithInvalidData, enterInvalidData, attemptToConfirmChangesWithInvalidData } from './UC3.4.3_TC3.functions.js';

test("UC3.4.3_TC3 - Modifica scheda censimento con dati non validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC3", "Modifica scheda censimento con dati non validi");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSectionForEditWithInvalidData(page, reporter);
    await clickAzioneEditButtonWithInvalidData(page, reporter);
    await enterInvalidData(page, reporter);
    await attemptToConfirmChangesWithInvalidData(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});