import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformWithDifferentBrowsers, verifyDashboardCompatibility } from './UC2_TC4.functions.js';

import { fillCorrectCredentials, clickLoginButton } from '../UC1_TC1/UC1_TC1.functions.js';

test("UC2_TC4 - Verifica della compatibilità della dashboard con browser differenti", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC4", "Verifica della compatibilità della dashboard con browser differenti");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformWithDifferentBrowsers(page, reporter);
    await verifyDashboardCompatibility(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});