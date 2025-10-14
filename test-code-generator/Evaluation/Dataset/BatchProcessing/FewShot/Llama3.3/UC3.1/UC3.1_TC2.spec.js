import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessEmptyCensusSheetSection, verifyNoDataMessage } from './UC3.1_TC2.functions.js';

test("UC3.1_TC2 - Visualizzazione schede censimento con nessun dato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC2", "Visualizzazione schede censimento con nessun dato");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessEmptyCensusSheetSection(page, reporter);
    await verifyNoDataMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});