import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSearchSection, insertValidSearchParameters, executeSearch } from './UC3.2_TC1.functions.js';

test("UC3.2_TC1 - Ricerca con parametri validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC1", "Ricerca con parametri validi");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await accessCensusSheetSearchSection(page, reporter);
    await insertValidSearchParameters(page, reporter);
    await executeSearch(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});