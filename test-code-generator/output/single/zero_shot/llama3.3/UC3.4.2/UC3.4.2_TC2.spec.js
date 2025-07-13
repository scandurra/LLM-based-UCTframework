import { test, expect } from '@playwright/test';

import { accessCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import { selectDeleteOperation, cancelDeleteOperation } from './UC3.4.2_TC2.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4.2_TC2 - Annullamento eliminazione scheda censimento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC2", "Annullamento eliminazione scheda censimento");

    // Navigate to the login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await selectDeleteOperation(page, reporter);
    await cancelDeleteOperation(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});