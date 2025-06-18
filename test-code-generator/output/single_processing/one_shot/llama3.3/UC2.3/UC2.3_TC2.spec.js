import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessGeneralDataTable, sortByRegion, checkAlternatingSorting } from './UC2.3_TC2.functions.js';

test("UC2.3_TC2 - Visualizzazione tabella dati generali con ordinamento personalizzato", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC2", "Visualizzazione tabella dati generali con ordinamento personalizzato");

  // Navigate to login page
  await page.goto(process.env.E2E_BASE_URL + process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await accessGeneralDataTable(page, reporter);
  await sortByRegion(page, reporter);
  await checkAlternatingSorting(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});