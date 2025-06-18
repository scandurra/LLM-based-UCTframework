import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSection, insertValidSearchParams, executeSearch } from './UC3.2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2_TC1 - Search with valid parameters", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC1", "Search with valid parameters");

    // Navigate to the login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessSearchSection(page, reporter);
    await insertValidSearchParams(page, reporter);
    await executeSearch(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});