import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { insertNameWithSpecialCharacters, confirmSearchWithSpecialCharacters, verifyResultsWithSpecialCharacters } from './UC3.2.1_TC4.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2.1_TC4 - Ricerca scheda censimento con caratteri speciali", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC4", "Ricerca scheda censimento con caratteri speciali");

    await page.goto('https://example.com'); // replace with the actual URL

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await insertNameWithSpecialCharacters(page, reporter);
    await confirmSearchWithSpecialCharacters(page, reporter);
    await verifyResultsWithSpecialCharacters(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});