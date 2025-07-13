import { test, expect } from '@playwright/test';

import { selectComuneAndSearchParameters, confirmSearch, visualizeIlluminationDetails } from './UC2.2_TC1.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.2_TC1", "Ricerca impianti di illuminazione con parametri validi");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await selectComuneAndSearchParameters(page, reporter);
    await confirmSearch(page, reporter);
    await visualizeIlluminationDetails(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});