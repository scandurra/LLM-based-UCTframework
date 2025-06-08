import { test, expect } from '@playwright/test';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from './UC1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC1_TC1 - Login test with success", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1 - Login test with success");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyAuthenticationSuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});