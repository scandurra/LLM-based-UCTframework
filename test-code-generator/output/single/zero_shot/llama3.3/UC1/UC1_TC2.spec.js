import { test, expect } from '@playwright/test';

import { insertWrongCredentials, clickLoginButton, checkRetryAccess } from './UC1_TC2.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

test("UC1_TC2 - Login with wrong credentials", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC2", "Login with wrong credentials");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await insertWrongCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await checkRetryAccess(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed"
});