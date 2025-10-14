import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { accessSearchSectionSpecial, insertSpecialSearchParameters, tryExecuteSearchSpecial } from './UC3.2_TC5.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2_TC5 - Ricerca con parametri speciali", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2_TC5", "Ricerca con parametri speciali");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await accessSearchSectionSpecial(page, reporter);
    await insertSpecialSearchParameters(page, reporter);
    await tryExecuteSearchSpecial(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});