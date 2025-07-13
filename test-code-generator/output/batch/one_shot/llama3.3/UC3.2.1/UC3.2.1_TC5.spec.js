import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import { insertLongName, confirmSearchWithLongName, verifyResultTruncation } from './UC3.2.1_TC5.functions.js';

test("UC3.2.1_TC5 - Ricerca scheda censimento con nome lungo", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC5", "Ricerca scheda censimento con nome lungo");

    await accessPlatformAndAuthenticate(page, reporter);

    await insertLongName(page, reporter);
    await confirmSearchWithLongName(page, reporter);
    await verifyResultTruncation(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});