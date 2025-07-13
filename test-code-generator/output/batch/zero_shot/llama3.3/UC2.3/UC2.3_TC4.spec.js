import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToGeneralDataTableForInvalidPageSize, verifyErrorMessageForInvalidPageSize, verifyDefaultPageSize } from './UC2.3_TC4.functions.js';

test("UC2.3_TC4 - Visualizzazione tabella dati generali con numero di elementi per pagina non valido", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.3_TC4", "Visualizzazione tabella dati generali con numero di elementi per pagina non valido");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await accessAndScrollToGeneralDataTableForInvalidPageSize(page, reporter);
    await verifyErrorMessageForInvalidPageSize(page, reporter);
    await verifyDefaultPageSize(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});