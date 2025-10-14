import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from './UC3.functions.js';

import { clickUploadSchedaModalButton, uploadWithoutFile } from './UC3.3_TC4.functions.js';

test("UC3.3_TC4 - Caricamento scheda censimento senza selezionare un file", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC4", "Caricamento scheda censimento senza selezionare un file");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await clickUploadSchedaModalButton(page, reporter);
    await uploadWithoutFile(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});