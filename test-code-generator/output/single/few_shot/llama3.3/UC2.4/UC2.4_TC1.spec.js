import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { selectCities, selectKPI, confirmRequest } from './UC2.4_TC1.functions.js';

test("UC2.4_TC1 - Select cities and KPI for benchmarking", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC1", "Select cities and KPI for benchmarking");

  // Precondition: Login as registered user and access platform
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifyAuthenticationSuccessMessage(page, null);

  // Access platform and select dashboard menu
  await accessPlatform(page, null);
  await selectDashboardMenu(page, null);

  // Call step functions in sequence
  await selectCities(page, reporter);
  await selectKPI(page, reporter);
  await confirmRequest(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});