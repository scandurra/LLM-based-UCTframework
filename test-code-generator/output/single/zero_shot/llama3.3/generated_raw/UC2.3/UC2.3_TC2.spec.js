import { test, expect } from '@playwright/test';

import { navigateToGeneralDataTable, sortByColumn, verifyAlternatingSorting } from './UC2.3_TC2.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC2.3_TC2 - Visualizzazione tabella dati generali con ordinamento personalizzato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.3_TC2", "Visualizzazione tabella dati generali con ordinamento personalizzato");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await navigateToGeneralDataTable(page, reporter);
    await sortByColumn(page, reporter);
    await verifyAlternatingSorting(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});