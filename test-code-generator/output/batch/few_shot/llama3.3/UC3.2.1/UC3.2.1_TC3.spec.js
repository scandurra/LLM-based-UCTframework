import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { leaveSearchFieldEmpty, verifyErrorMessage, insertValidNameAfterError } from './UC3.2.1_TC3.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2.1_TC3 - Ricerca scheda censimento con campo nome vuoto", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC3", "Ricerca scheda censimento con campo nome vuoto");

    await page.goto('https://example.com'); // replace with the actual URL

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await leaveSearchFieldEmpty(page, reporter);
    await verifyErrorMessage(page, reporter);
    await insertValidNameAfterError(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});