import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { tryDownloadWithoutSelection, verifyDownloadError } from './UC3.4.1_TC2.functions.js';

test("UC3.4.1_TC2 - Download scheda censimento senza selezionare il file", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.1_TC2", "Download scheda censimento senza selezionare il file");

  await page.goto(process.env.E2E_LOGIN_URL);

  await tryDownloadWithoutSelection(page, reporter);
  await verifyDownloadError(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});