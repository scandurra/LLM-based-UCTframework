import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertWrongCredentials, clickLoginButton, verifyErrorMessage } from './UC1_TC2.functions.js';

test("UC1_TC2 - Login con credenziali errate", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC2", "Login con credenziali errate");

    await insertWrongCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyErrorMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});