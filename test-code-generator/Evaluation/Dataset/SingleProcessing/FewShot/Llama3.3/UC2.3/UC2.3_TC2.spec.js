import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { scrollToGeneralDataTable, sortByColumn, verifyAlternatingSorting } from './UC2.3_TC2.functions.js';

test("UC2.3_TC2 - Visualize general data table with custom sorting", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC2", "Visualize general data table with custom sorting");

  // Precondition: Login as registered user and access platform
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifyAuthenticationSuccessMessage(page, null);

  // Precondition: Access dashboard
  await accessPlatform(page, null);
  await selectDashboardMenu(page, null);

  // Call step functions in sequence
  await scrollToGeneralDataTable(page, reporter);
  await sortByColumn(page, reporter);
  await verifyAlternatingSorting(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});