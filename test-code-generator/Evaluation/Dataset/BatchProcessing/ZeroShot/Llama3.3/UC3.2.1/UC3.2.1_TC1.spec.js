import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { insertValidSearchName, confirmSearch, viewSearchResults } from './UC3.2.1_TC1.functions.js';

test("UC3.2.1_TC1 - Ricerca scheda censimento per nome con risultati validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC1", "Ricerca scheda censimento per nome con risultati validi");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await insertValidSearchName(page, reporter);
    await confirmSearch(page, reporter);
    await viewSearchResults(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});