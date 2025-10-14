import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSectionWithSearch, searchForData } from './UC3.1_TC5.functions.js';

test("UC3.1_TC5 - Visualizzazione schede censimento con ricerca", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC5", "Visualizzazione schede censimento con ricerca");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSectionWithSearch(page, reporter);
    await searchForData(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});