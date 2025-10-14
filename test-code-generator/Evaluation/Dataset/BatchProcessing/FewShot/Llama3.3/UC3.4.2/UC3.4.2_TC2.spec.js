import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

import { selectDeleteOperationTC2, cancelDelete } from './UC3.4.2_TC2.functions.js';

test("UC3.4.2_TC2 - Annullamento eliminazione scheda censimento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC2", "Annullamento eliminazione scheda censimento");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSection(page, reporter);
    await selectDeleteOperationTC2(page, reporter);
    await cancelDelete(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});