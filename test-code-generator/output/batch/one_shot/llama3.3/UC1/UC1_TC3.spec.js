import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertNewPassword, confirmNewPassword, verifyNewPasswordSuccess } from './UC1_TC3.functions.js';

test("UC1_TC3 - Cambio della prima password di accesso", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC3", "Cambio della prima password di accesso");

  await page.goto(process.env.E2E_LOGIN_URL);

  await insertNewPassword(page, reporter);
  await confirmNewPassword(page, reporter);
  await verifyNewPasswordSuccess(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});