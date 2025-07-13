import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickUploadSchedaModalButton } from './UC3.3_TC1.functions.js';

import { uploadWithLongFileName, verifyLongFileNameError } from './UC3.3_TC5.functions.js';

test("UC3.3_TC5 - Caricamento scheda censimento con nome file lungo", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC5", "Caricamento scheda censimento con nome file lungo");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await clickUploadSchedaModalButton(page, reporter);
    await uploadWithLongFileName(page, reporter);
    await verifyLongFileNameError(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});