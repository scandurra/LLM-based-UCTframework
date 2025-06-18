import { test, expect } from '@playwright/test';

import { leaveUsernameFieldEmptyAndInsertPassword, clickLoginButton, verifyInputCorrection } from './UC1_TC4.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

test("UC1_TC4 - Attempt to login with empty username field", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC4", "Attempt to login with empty username field");

    // Navigate to login page
    await page.goto(process.env.E2E_BASE_URL + process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await leaveUsernameFieldEmptyAndInsertPassword(page, reporter);
    await clickLoginButton(page, reporter);
    await verifyInputCorrection(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed"
});