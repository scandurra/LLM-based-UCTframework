import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openMultipleBrowserTabs, logoutFromOneTab, verifyOtherTabsAreNotAuthenticated } from './UC6_TC3.functions.js';

test("UC6_TC3 - Logout con più sessioni aperte", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC6_TC3", "Logout con più sessioni aperte");

    // Open multiple browser tabs
    const pages = [];
    for (let i = 0; i < 5; i++) {
        const newPage = await page.context().newPage();
        pages.push(newPage);
        await newPage.goto(process.env.E2E_BASE_URL);
    }

    // Call step functions in sequence
    await openMultipleBrowserTabs(pages[0], reporter);
    await logoutFromOneTab(pages[0], reporter);
    await verifyOtherTabsAreNotAuthenticated(pages.slice(1), reporter);

    reporter.onTestEnd(test, { status: "passed" });
});