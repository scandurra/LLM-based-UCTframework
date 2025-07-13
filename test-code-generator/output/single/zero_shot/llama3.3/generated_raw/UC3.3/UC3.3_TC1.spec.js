import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate, selectCensusSheetMenuOption } from '../UC3/UC3_TC1.functions.js';

import { clickUploadSchedaButton, selectFileAndUpload, verifyUploadSuccess } from './UC3.3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC1", "Caricamento scheda censimento con dati validi e formato supportato");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenuOption(page, reporter);
    await clickUploadSchedaButton(page, reporter);
    await selectFileAndUpload(page, reporter);
    await verifyUploadSuccess(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});