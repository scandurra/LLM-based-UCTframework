import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSearchSection, insertValidSearchParameters, executeSearch } from '../UC3.2_TC1.functions.js';

import { insertLongName, confirmSearchWithLongName, verifyResultsWithLongName } from './UC3.2.1_TC5.functions.js';

test("UC3.2.1_TC5 - Ricerca scheda censimento con nome lungo", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.2.1_TC5", "Ricerca scheda censimento con nome lungo");

    await accessCensusSheetSearchSection(page, reporter);
    await insertLongName(page, reporter);
    await confirmSearchWithLongName(page, reporter);
    await verifyResultsWithLongName(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});