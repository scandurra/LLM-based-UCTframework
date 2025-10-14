import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSectionMultiple, insertMultipleSearchParameters, executeSearchMultiple } from './UC3.2_TC4.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2_TC4 - Ricerca con molti parametri", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC4", "Ricerca con molti parametri");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await accessSearchSectionMultiple(page, reporter);
    await insertMultipleSearchParameters(page, reporter);
    await executeSearchMultiple(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});