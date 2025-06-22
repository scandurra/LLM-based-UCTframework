import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToGeneralDataTableForQuickSearch, verifyQuickSearchFunctionality, verifyQuickSearchResult } from './UC2.3_TC5.functions.js';

test("UC2.3_TC5 - Visualizzazione tabella dati generali con ricerca rapida", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.3_TC5", "Visualizzazione tabella dati generali con ricerca rapida");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await accessAndScrollToGeneralDataTableForQuickSearch(page, reporter);
    await verifyQuickSearchFunctionality(page, reporter);
    await verifyQuickSearchResult(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});