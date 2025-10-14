import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3.4/UC3.4_TC1.functions.js';

import { selectEditOperationTC3, insertInvalidData, tryToConfirmChangesTC3 } from './UC3.4.3_TC3.functions.js';

test("UC3.4.3_TC3 - Modifica scheda censimento con dati non validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC3", "Modifica scheda censimento con dati non validi");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSection(page, reporter);
    await selectEditOperationTC3(page, reporter);
    await insertInvalidData(page, reporter);
    await tryToConfirmChangesTC3(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});