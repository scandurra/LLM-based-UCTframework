import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { fillCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { clickUserIcon, selectUnsupportedLanguage, verifyDefaultLanguage } from './UC5_TC3.functions.js';

test("UC5_TC3 - Selezione lingua non supportata", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC3", "Selezione lingua non supportata");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await fillCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifySuccessMessage(page, reporter);
    await clickUserIcon(page, reporter);
    await selectUnsupportedLanguage(page, reporter);
    await page.reload();
    await verifyDefaultLanguage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});