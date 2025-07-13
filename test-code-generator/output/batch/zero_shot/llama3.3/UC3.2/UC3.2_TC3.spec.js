import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSectionInvalid, insertInvalidSearchParameters, tryExecuteSearchInvalid } from './UC3.2_TC3.functions.js';

test("UC3.2_TC3 - Ricerca con parametri non validi", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC3", "Ricerca con parametri non validi");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessSearchSectionInvalid(page, reporter);
    await insertInvalidSearchParameters(page, reporter);
    await tryExecuteSearchInvalid(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});