import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSection } from './UC3.2_TC1.functions.js';

import { insertValidNameInSearchBar, confirmSearch, viewCensusSheetDetails } from './UC3.2.1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2.1_TC1 - Search census sheet by name with valid results", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC1 - Search census sheet by name with valid results");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessSearchSection(page, reporter);
    await insertValidNameInSearchBar(page, reporter);
    await confirmSearch(page, reporter);
    await viewCensusSheetDetails(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});