import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSearchSection, insertValidSearchParameters, executeSearch } from '../UC3.2_TC1.functions.js';

import { insertValidNameInSearchBar, confirmSearch, viewSearchResultsDetails } from './UC3.2.1_TC1.functions.js';

test("UC3.2.1_TC1 - Ricerca scheda censimento per nome con risultati validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC1", "Ricerca scheda censimento per nome con risultati validi");

    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessCensusSheetSearchSection(page, reporter);
    await insertValidNameInSearchBar(page, reporter);
    await confirmSearch(page, reporter);
    await viewSearchResultsDetails(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});