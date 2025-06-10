import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { openDashboard } from '../UC2/UC2_TC1.functions.js';

import { navigateToDashboardAndTable, sortByColumn, verifyAlternatingSorting } from './UC2.3_TC2.functions.js';

test("UC2.3_TC2 - Visualizzazione tabella dati generali con ordinamento personalizzato", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC2 - Visualizzazione tabella dati generali con ordinamento personalizzato");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Reuse existing methods from UC1
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);

  await navigateToDashboardAndTable(page, reporter);
  await sortByColumn(page, reporter);
  await verifyAlternatingSorting(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});