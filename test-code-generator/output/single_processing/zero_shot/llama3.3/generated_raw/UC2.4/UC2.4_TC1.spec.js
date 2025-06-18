import { test, expect } from '@playwright/test';

import { selectCities, selectKPI, confirmRequestAndVerifyResults } from './UC2.4_TC1.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC1", "Selezione di comuni e KPI validi per benchmarking");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await selectCities(page, reporter);
    await selectKPI(page, reporter);
    await confirmRequestAndVerifyResults(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});