import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSearchSection, insertValidSearchParameters, executeSearch } from '../UC3.2_TC1.functions.js';

import { insertNonExistentNameInSearchBar, confirmSearchWithNonExistentName, verifyFeedbackMessage } from './UC3.2.1_TC2.functions.js';

test("UC3.2.1_TC2 - Ricerca scheda censimento con nome non esistente", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC2", "Ricerca scheda censimento con nome non esistente");

    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessCensusSheetSearchSection(page, reporter);
    await insertNonExistentNameInSearchBar(page, reporter);
    await confirmSearchWithNonExistentName(page, reporter);
    await verifyFeedbackMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});