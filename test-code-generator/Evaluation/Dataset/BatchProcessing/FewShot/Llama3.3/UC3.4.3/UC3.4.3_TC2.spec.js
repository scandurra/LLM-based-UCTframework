import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

import { selectEditOperationTC2, leaveRequiredFieldsEmpty, tryToConfirmChanges } from './UC3.4.3_TC2.functions.js';

test("UC3.4.3_TC2 - Modifica scheda censimento con dati mancanti", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC2", "Modifica scheda censimento con dati mancanti");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSection(page, reporter);
    await selectEditOperationTC2(page, reporter);
    await leaveRequiredFieldsEmpty(page, reporter);
    await tryToConfirmChanges(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});