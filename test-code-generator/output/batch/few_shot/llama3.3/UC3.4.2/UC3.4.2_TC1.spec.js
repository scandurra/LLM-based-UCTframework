import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

import { selectDeleteOperation, confirmDelete } from './UC3.4.2_TC1.functions.js';

test("UC3.4.2_TC1 - Elimina scheda censimento con conferma", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC1", "Elimina scheda censimento con conferma");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSection(page, reporter);
    await selectDeleteOperation(page, reporter);
    await confirmDelete(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});