import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSearchSection, insertValidSearchParameters, executeSearch } from '../UC3.2_TC1.functions.js';

import { leaveSearchBarEmpty, verifyErrorMessage, insertValidNameAndRepeatSearch } from './UC3.2.1_TC3.functions.js';

test("UC3.2.1_TC3 - Ricerca scheda censimento con campo nome vuoto", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC3", "Ricerca scheda censimento con campo nome vuoto");

    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessCensusSheetSearchSection(page, reporter);
    await leaveSearchBarEmpty(page, reporter);
    await verifyErrorMessage(page, reporter);
    await insertValidNameAndRepeatSearch(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});