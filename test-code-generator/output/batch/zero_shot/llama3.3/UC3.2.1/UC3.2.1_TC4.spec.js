import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { insertSearchNameWithSpecialChars, confirmSearchWithSpecialChars, verifySearchResultsWithSpecialChars } from './UC3.2.1_TC4.functions.js';

test("UC3.2.1_TC4 - Ricerca scheda censimento con caratteri speciali", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC4", "Ricerca scheda censimento con caratteri speciali");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await insertSearchNameWithSpecialChars(page, reporter);
    await confirmSearchWithSpecialChars(page, reporter);
    await verifySearchResultsWithSpecialChars(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});