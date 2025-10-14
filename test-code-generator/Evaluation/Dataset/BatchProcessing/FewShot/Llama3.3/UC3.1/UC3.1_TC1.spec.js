import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, selectColumnForSorting, scrollHorizontally } from './UC3.1_TC1.functions.js';

test("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC1", "Visualizzazione schede censimento con dati validi e ordinamento");

    await page.goto(process.env.E2E_LOGIN_URL);

    await accessCensusSheetSection(page, reporter);
    await selectColumnForSorting(page, reporter);
    await scrollHorizontally(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     
});