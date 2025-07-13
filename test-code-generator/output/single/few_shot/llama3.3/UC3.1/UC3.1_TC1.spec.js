import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { visualizeCensusSheets, sortCensusSheets, scrollCensusSheets } from './UC3.1_TC1.functions.js';

import { authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

test("UC3.1_TC1 - Visualize census sheets with valid data and sorting", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC1", "Visualize census sheets with valid data and sorting");

    // Preconditions
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await authenticateAndOpenDashboard(page, reporter);
    await visualizeCensusSheets(page, reporter);
    await sortCensusSheets(page, reporter);
    await scrollCensusSheets(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});