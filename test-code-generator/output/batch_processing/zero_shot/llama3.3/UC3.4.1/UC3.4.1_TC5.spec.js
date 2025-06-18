import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection } from './UC3.4_TC1.functions.js';

import { startDownload, interruptDownload } from './UC3.4.1_TC5.functions.js';

test("UC3.4.1_TC5 - Download scheda censimento interrotto", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.1_TC5", "Download scheda censimento interrotto");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await startDownload(page, reporter);
    await interruptDownload(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});