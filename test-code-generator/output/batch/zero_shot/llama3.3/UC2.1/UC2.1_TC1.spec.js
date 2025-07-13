import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickDownloadPDFButton, confirmDownloadRequest, verifySuccessMessage } from './UC2.1_TC1.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.1_TC1 - Download PDF con successo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC1", "Download PDF con successo");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await clickDownloadPDFButton(page, reporter);
    await confirmDownloadRequest(page, reporter);
    await verifySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});