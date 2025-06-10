import { test, expect } from '@playwright/test';

import { insertWrongCredentials, clickLoginButton, verifyRetryOption } from './UC1_TC2.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC1_TC2 - Login with wrong credentials", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC2 - Login with wrong credentials");

    await insertWrongCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyRetryOption(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});