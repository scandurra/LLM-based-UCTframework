import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { insertNonExistentSearchName, confirmNonExistentSearch, verifyNoResultsMessage } from './UC3.2.1_TC2.functions.js';

test("UC3.2.1_TC2 - Ricerca scheda censimento con nome non esistente", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC2", "Ricerca scheda censimento con nome non esistente");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await insertNonExistentSearchName(page, reporter);
    await confirmNonExistentSearch(page, reporter);
    await verifyNoResultsMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});