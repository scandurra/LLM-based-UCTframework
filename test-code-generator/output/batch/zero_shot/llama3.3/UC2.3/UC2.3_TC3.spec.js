import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToGeneralDataTableForNonExistingCity, verifyErrorMessageForNonExistingCity, verifyErrorMessageUsefulness } from './UC2.3_TC3.functions.js';

test("UC2.3_TC3 - Visualizzazione tabella dati generali con selezione di comuni non esistenti", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.3_TC3", "Visualizzazione tabella dati generali con selezione di comuni non esistenti");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await accessAndScrollToGeneralDataTableForNonExistingCity(page, reporter);
    await verifyErrorMessageForNonExistingCity(page, reporter);
    await verifyErrorMessageUsefulness(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});