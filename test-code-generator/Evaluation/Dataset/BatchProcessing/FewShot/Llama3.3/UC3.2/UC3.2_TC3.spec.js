import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSectionInvalid, insertInvalidSearchParameters, tryExecuteSearchInvalid } from './UC3.2_TC3.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2_TC3 - Ricerca con parametri non validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC3", "Ricerca con parametri non validi");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await accessSearchSectionInvalid(page, reporter);
    await insertInvalidSearchParameters(page, reporter);
    await tryExecuteSearchInvalid(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});