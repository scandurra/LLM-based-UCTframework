import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { insertInvalidParams, tryConfirmSearchWithInvalidParams } from './UC2.2_TC3.functions.js';

test("UC2.2_TC3 - Ricerca con parametri non validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.2_TC3", "Ricerca con parametri non validi");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await insertInvalidParams(page, reporter);
    await tryConfirmSearchWithInvalidParams(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});