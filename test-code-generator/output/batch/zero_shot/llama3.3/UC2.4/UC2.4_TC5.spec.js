import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { searchForCities, selectKPIUsingFilter, confirmRequestWithSearchAndFilter } from './UC2.4_TC5.functions.js';

test("UC2.4_TC5 - Usabilità: ricerca e filtro per comuni e KPI", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC5", "Usabilità: ricerca e filtro per comuni e KPI");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await searchForCities(page, reporter);
    await selectKPIUsingFilter(page, reporter);
    await confirmRequestWithSearchAndFilter(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});