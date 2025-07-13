import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSectionWithPagination, navigateThroughPages } from './UC3.1_TC4.functions.js';

test("UC3.1_TC4 - Visualizzazione schede censimento con paginazione", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC4", "Visualizzazione schede censimento con paginazione");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSectionWithPagination(page, reporter);
    await navigateThroughPages(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});