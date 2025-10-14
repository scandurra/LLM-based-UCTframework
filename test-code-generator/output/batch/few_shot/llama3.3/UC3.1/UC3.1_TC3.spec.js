import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSectionWithMultipleSorting, selectMultipleColumnsForSorting } from './UC3.1_TC3.functions.js';

test("UC3.1_TC3 - Visualizzazione schede censimento con ordinamento su più colonne", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC3", "Visualizzazione schede censimento con ordinamento su più colonne");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSectionWithMultipleSorting(page, reporter);
    await selectMultipleColumnsForSorting(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});