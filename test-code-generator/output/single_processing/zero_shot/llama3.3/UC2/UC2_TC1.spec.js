import { test, expect } from '@playwright/test';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from './UC2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC2_TC1 - Open dashboard with authorized user", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1 - Open dashboard with authorized user");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});