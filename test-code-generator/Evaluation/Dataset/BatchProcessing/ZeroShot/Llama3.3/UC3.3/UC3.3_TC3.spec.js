import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickUploadSchedaModalButton } from './UC3.3_TC1.functions.js';

import { selectLargeFileAndUpload, verifySizeError } from './UC3.3_TC3.functions.js';

test("UC3.3_TC3 - Caricamento scheda censimento con dimensione file eccessiva", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC3", "Caricamento scheda censimento con dimensione file eccessiva");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await clickUploadSchedaModalButton(page, reporter);
    await selectLargeFileAndUpload(page, reporter);
    await verifySizeError(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});