import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { insertValidName, confirmSearch, viewDetails } from './UC3.2.1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2.1_TC1 - Ricerca scheda censimento per nome con risultati validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC1", "Ricerca scheda censimento per nome con risultati validi");

    await page.goto('https://example.com'); // replace with the actual URL

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await insertValidName(page, reporter);
    await confirmSearch(page, reporter);
    await viewDetails(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});