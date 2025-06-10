import { test, expect } from '@playwright/test';

import { accessSystemAsRegisteredUser, clickLogoutButton, confirmLogoutIntention } from './UC6_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC6_TC1 - Logout user with success", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC1 - Logout user with success");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessSystemAsRegisteredUser(page, reporter);
    await clickLogoutButton(page, reporter);
    await confirmLogoutIntention(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});