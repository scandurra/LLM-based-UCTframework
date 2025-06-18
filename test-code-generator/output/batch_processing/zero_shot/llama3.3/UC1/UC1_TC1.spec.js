import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { fillCorrectCredentials, clickLoginButton, verifySuccessMessage } from './UC1_TC1.functions.js';

test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1", "Login con credenziali valide");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await fillCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});