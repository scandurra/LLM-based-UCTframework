import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSearchSection, insertValidSearchParameters, executeSearch } from '../UC3.2_TC1.functions.js';

import { insertNameWithSpecialCharactersInSearchBar, confirmSearchWithSpecialCharacters, verifyAccuracyOfResults } from './UC3.2.1_TC4.functions.js';

test("UC3.2.1_TC4 - Ricerca scheda censimento con caratteri speciali", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC4", "Ricerca scheda censimento con caratteri speciali");

    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessCensusSheetSearchSection(page, reporter);
    await insertNameWithSpecialCharactersInSearchBar(page, reporter);
    await confirmSearchWithSpecialCharacters(page, reporter);
    await verifyAccuracyOfResults(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});