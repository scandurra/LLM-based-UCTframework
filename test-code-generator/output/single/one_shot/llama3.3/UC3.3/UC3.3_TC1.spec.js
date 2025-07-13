import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

import { clickUploadSchedaButton, selectFileAndCompileParameters, uploadFile } from './UC3.3_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC3.3_TC1 - Caricamento scheda censimento con dati validi e formato supportato", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.3_TC1", "Caricamento scheda censimento con dati validi e formato supportato");

    // Preconditions: UC1 and UC3
    await page.goto(process.env.E2E_LOGIN_URL);
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    await verifySuccessMessage(page, null);
    await openCensusSheetsInterface(page, null);

    // Call step functions in sequence
    await clickUploadSchedaButton(page, reporter);
    await selectFileAndCompileParameters(page, reporter);
    await uploadFile(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});