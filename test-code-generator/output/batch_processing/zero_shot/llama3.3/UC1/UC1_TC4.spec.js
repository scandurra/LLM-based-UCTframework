import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { leaveUsernameEmpty, clickLoginButtonEmptyUsername, verifyErrorMessageEmptyUsername } from './UC1_TC4.functions.js';

test("UC1_TC4 - Tentativo di login con username vuoto", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC4", "Tentativo di login con username vuoto");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await leaveUsernameEmpty(page, reporter);
    await clickLoginButtonEmptyUsername(page, reporter);
    await verifyErrorMessageEmptyUsername(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});