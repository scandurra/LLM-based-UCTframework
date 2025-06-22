import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSectionForEditWithCancel, clickAzioneEditButtonWithCancel, makeChangesAndCancel } from './UC3.4.3_TC4.functions.js';

test("UC3.4.3_TC4 - Modifica scheda censimento con annullamento", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC4", "Modifica scheda censimento con annullamento");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSectionForEditWithCancel(page, reporter);
    await clickAzioneEditButtonWithCancel(page, reporter);
    await makeChangesAndCancel(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});