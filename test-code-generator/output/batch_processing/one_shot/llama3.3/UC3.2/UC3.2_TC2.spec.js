import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSearchSectionEmpty, leaveSearchBarEmpty, attemptSearchWithEmptyBar } from './UC3.2_TC2.functions.js';

test("UC3.2_TC2 - Ricerca senza parametri", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC2", "Ricerca senza parametri");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await accessCensusSheetSearchSectionEmpty(page, reporter);
    await leaveSearchBarEmpty(page, reporter);
    await attemptSearchWithEmptyBar(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});