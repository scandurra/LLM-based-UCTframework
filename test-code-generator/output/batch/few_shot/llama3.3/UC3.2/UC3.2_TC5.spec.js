import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSearchSectionSpecialChars, insertSearchParametersWithSpecialChars, executeSearchWithSpecialChars } from './UC3.2_TC5.functions.js';

test("UC3.2_TC5 - Ricerca con caratteri speciali", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC5", "Ricerca con caratteri speciali");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await accessCensusSheetSearchSectionSpecialChars(page, reporter);
    await insertSearchParametersWithSpecialChars(page, reporter);
    await executeSearchWithSpecialChars(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});