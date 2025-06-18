import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickDownloadPDFButtonWithoutConfirmation, verifyNoDownloadStarted, verifyConfirmationRequestMessage } from './UC2.1_TC3.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.1_TC3 - Download PDF senza conferma", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.1_TC3", "Download PDF senza conferma");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await clickDownloadPDFButtonWithoutConfirmation(page, reporter);
    await verifyNoDownloadStarted(page, reporter);
    await verifyConfirmationRequestMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});