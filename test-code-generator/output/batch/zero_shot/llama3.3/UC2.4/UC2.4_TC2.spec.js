import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { selectSingleCity, selectValidKPIWithoutMultipleCities, tryToConfirmRequestWithoutMultipleCities } from './UC2.4_TC2.functions.js';

test("UC2.4_TC2 - Selezione di un solo comune per benchmarking", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC2", "Selezione di un solo comune per benchmarking");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await selectSingleCity(page, reporter);
    await selectValidKPIWithoutMultipleCities(page, reporter);
    await tryToConfirmRequestWithoutMultipleCities(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});