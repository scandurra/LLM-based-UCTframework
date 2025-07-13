import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openMultipleBrowserTabs, performLogoutFromOneTab } from './UC6_TC3.functions.js';

test("UC6_TC3 - Logout con più sessioni aperte", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC3", "Logout con più sessioni aperte");

    await openMultipleBrowserTabs(page, reporter);
    await performLogoutFromOneTab(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});