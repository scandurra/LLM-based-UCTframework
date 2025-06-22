import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { selectMultipleCitiesWithInvalidKPI, selectInvalidKPI, tryToConfirmRequestWithInvalidKPI } from './UC2.4_TC3.functions.js';

test("UC2.4_TC3 - Selezione di comuni e KPI non validi per benchmarking", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC3", "Selezione di comuni e KPI non validi per benchmarking");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await selectMultipleCitiesWithInvalidKPI(page, reporter);
    await selectInvalidKPI(page, reporter);
    await tryToConfirmRequestWithInvalidKPI(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});