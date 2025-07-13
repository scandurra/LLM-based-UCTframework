import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { selectMaximumNumberOfCities, selectValidKPIWithMaximumCities, confirmRequestWithMaximumCities } from './UC2.4_TC4.functions.js';

test("UC2.4_TC4 - Boundary test: selezione del massimo numero di comuni consentito", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC4", "Boundary test: selezione del massimo numero di comuni consentito");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await selectMaximumNumberOfCities(page, reporter);
    await selectValidKPIWithMaximumCities(page, reporter);
    await confirmRequestWithMaximumCities(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});