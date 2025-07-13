import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { insertLongSearchName, confirmLongSearch, verifyLongSearchResults } from './UC3.2.1_TC5.functions.js';

test("UC3.2.1_TC5 - Ricerca scheda censimento con nome lungo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC5", "Ricerca scheda censimento con nome lungo");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await insertLongSearchName(page, reporter);
    await confirmLongSearch(page, reporter);
    await verifyLongSearchResults(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});