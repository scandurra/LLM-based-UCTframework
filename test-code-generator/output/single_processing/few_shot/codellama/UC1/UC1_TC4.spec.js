import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { leaveUsernameFieldEmpty, clickLoginButton, verifyErrorMessage } from './UC1_TC4.functions.js';

test("UC1_TC4 - Tentativo di login con campo username vuoto", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC4", "Tentativo di login con campo username vuoto");

  await leaveUsernameFieldEmpty(page, reporter);
  await clickLoginButton(page, reporter);
  await verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});