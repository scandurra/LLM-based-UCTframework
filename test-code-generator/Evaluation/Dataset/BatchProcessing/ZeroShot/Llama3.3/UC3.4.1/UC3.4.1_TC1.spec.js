import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection } from './UC3.4_TC1.functions.js';

import { selectDownloadOperation, waitDownloadCompletion } from './UC3.4.1_TC1.functions.js';

test("UC3.4.1_TC1 - Download scheda censimento con successo", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.1_TC1", "Download scheda censimento con successo");

    await page.goto(process.env.E2E_BASE_URL);

    // Call step functions in sequence
    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await selectDownloadOperation(page, reporter);
    await waitDownloadCompletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});