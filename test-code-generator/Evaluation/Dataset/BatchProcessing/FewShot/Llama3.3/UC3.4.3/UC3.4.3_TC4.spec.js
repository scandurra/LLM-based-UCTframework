import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

import { selectEditOperationTC4, makeChanges, cancelChanges } from './UC3.4.3_TC4.functions.js';

test("UC3.4.3_TC4 - Modifica scheda censimento e annullamento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC4", "Modifica scheda censimento e annullamento");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSection(page, reporter);
    await selectEditOperationTC4(page, reporter);
    await makeChanges(page, reporter);
    await cancelChanges(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});