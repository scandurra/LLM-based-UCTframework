import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformWithMobileDevice, verifyDashboardNavigation } from './UC2_TC5.functions.js';

import { fillCorrectCredentials, clickLoginButton } from '../UC1_TC1/UC1_TC1.functions.js';

test("UC2_TC5 - Apertura della dashboard su dispositivi mobili", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC5", "Apertura della dashboard su dispositivi mobili");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformWithMobileDevice(page, reporter);
    await verifyDashboardNavigation(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});