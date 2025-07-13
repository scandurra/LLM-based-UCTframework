import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickUploadSchedaModalButton, selectValidFileAndUpload, verifyUploadSuccess } from './UC3.3_TC1.functions.js';

test("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC1", "Caricamento scheda censimento con dati validi e formato supportato");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await clickUploadSchedaModalButton(page, reporter);
    await selectValidFileAndUpload(page, reporter);
    await verifyUploadSuccess(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});