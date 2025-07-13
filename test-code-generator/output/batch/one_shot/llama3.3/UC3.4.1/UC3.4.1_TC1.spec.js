import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, selectDownloadOperation, waitForDownload } from './UC3.4.1_TC1.functions.js';

test("UC3.4.1_TC1 - Download scheda censimento con successo", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.1_TC1", "Download scheda censimento con successo");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessCensusSheetSection(page, reporter);
  await selectDownloadOperation(page, reporter);
  await waitForDownload(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});