import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickDownloadButton, confirmDownloadRequest, verifySuccessMessage } from './UC2.1_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.1_TC1 - Download PDF with success", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC1", "Download PDF with success");

  // Precondition: Login as registered user and access dashboard
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifyAuthenticationSuccessMessage(page, null);
  await accessPlatform(page, null);
  await selectDashboardMenu(page, null);

  // Call step functions in sequence
  await clickDownloadButton(page, reporter);
  await confirmDownloadRequest(page, reporter);
  await verifySuccessMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});