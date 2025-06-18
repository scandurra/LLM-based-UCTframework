import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSectionForSearch, performSearch } from './UC3.1_TC5.functions.js';

test("UC3.1_TC5 - Visualizzazione schede censimento con ricerca", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC5", "Visualizzazione schede censimento con ricerca");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSectionForSearch(page, reporter);
    await performSearch(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});