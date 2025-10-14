import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { insertNonExistingName, confirmSearchNonExisting, verifyFeedbackMessage } from './UC3.2.1_TC2.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.2.1_TC2 - Ricerca scheda censimento con nome non esistente", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC2", "Ricerca scheda censimento con nome non esistente");

    await page.goto('https://example.com'); // replace with the actual URL

    await accessPlatformAndAuthenticate(page, reporter);
    await selectCensusSheetMenu(page, reporter);
    await insertNonExistingName(page, reporter);
    await confirmSearchNonExisting(page, reporter);
    await verifyFeedbackMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});