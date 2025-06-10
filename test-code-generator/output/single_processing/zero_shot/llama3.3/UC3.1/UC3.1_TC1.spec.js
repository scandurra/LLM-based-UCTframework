import { test, expect } from '@playwright/test';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection, selectColumnForSorting, scrollHorizontallyToViewAllColumns } from './UC3.1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await selectColumnForSorting(page, reporter);
    await scrollHorizontallyToViewAllColumns(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});