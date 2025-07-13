import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { leaveSearchFieldEmpty, verifyErrorFeedback, insertValidSearchNameAgain } from './UC3.2.1_TC3.functions.js';

test("UC3.2.1_TC3 - Ricerca scheda censimento con campo nome vuoto", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC3", "Ricerca scheda censimento con campo nome vuoto");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await leaveSearchFieldEmpty(page, reporter);
    await verifyErrorFeedback(page, reporter);
    await insertValidSearchNameAgain(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});