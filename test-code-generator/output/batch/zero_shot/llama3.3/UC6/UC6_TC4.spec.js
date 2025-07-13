import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { waitUntilSessionExpires, tryToLogout } from './UC6_TC4.functions.js';

test("UC6_TC4 - Edge case: logout da dispositivo diverso", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC4", "Edge case: logout da dispositivo diverso");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await waitUntilSessionExpires(page, reporter);
    await tryToLogout(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});