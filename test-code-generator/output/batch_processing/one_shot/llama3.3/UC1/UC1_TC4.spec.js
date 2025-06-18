import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { leaveUsernameEmpty, clickLoginButtonEmptyUsername, verifyEmptyUsernameErrorMessage } from './UC1_TC4.functions.js';

test("UC1_TC4 - Tentativo di login con username vuoto", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC4", "Tentativo di login con username vuoto");

  await page.goto(process.env.E2E_LOGIN_URL);

  await leaveUsernameEmpty(page, reporter);
  await clickLoginButtonEmptyUsername(page, reporter);
  await verifyEmptyUsernameErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});