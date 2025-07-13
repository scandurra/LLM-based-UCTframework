import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToGeneralDataTable, verifySortingFunctionality, verifyMultipleSorting } from './UC2.3_TC2.functions.js';

test("UC2.3_TC2 - Visualizzazione tabella dati generali con ordinamento su più colonne", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.3_TC2", "Visualizzazione tabella dati generali con ordinamento su più colonne");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await accessAndScrollToGeneralDataTable(page, reporter);
    await verifySortingFunctionality(page, reporter);
    await verifyMultipleSorting(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});