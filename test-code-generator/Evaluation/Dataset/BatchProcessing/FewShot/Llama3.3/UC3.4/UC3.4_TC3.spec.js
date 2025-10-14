import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSectionTC3, tryExecuteActionWithoutPermissions } from './UC3.4_TC3.functions.js';

test("UC3.4_TC3 - Esecuzione di un’azione su scheda censimento senza permessi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4_TC3", "Esecuzione di un’azione su scheda censimento senza permessi");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSectionTC3(page, reporter);
    await tryExecuteActionWithoutPermissions(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});