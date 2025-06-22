import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickDownloadPDFButtonAndRetry, verifyDownloadStarted, verifySuccessMessageAfterRetry } from './UC2.1_TC4.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.1_TC4 - Download PDF con ritentiva", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC4", "Download PDF con ritentiva");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await clickDownloadPDFButtonAndRetry(page, reporter);
    await verifyDownloadStarted(page, reporter);
    await verifySuccessMessageAfterRetry(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});