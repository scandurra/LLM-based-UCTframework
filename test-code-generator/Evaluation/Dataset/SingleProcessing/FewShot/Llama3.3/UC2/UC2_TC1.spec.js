import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from './UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC2_TC1 - Open dashboard with authorized user", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1", "Open dashboard with authorized user");

  // Precondition: Login as registered user
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifyAuthenticationSuccessMessage(page, null);

  // Call step functions in sequence
  await accessPlatform(page, reporter);
  await selectDashboardMenu(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});