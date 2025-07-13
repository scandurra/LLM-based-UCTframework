import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickUploadSchedaModalButton } from './UC3.3_TC1.functions.js';

import { selectInvalidFileAndUpload, verifyError } from './UC3.3_TC2.functions.js';

test("UC3.3_TC2 - Caricamento scheda censimento con formato non supportato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC2", "Caricamento scheda censimento con formato non supportato");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await clickUploadSchedaModalButton(page, reporter);
    await selectInvalidFileAndUpload(page, reporter);
    await verifyError(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});