import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertIncorrectCredentials, clickLoginButton, verifyRetryLogin } from './UC1_TC2.functions.js';

test("UC1_TC2 - Login with incorrect credentials", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC2 - Login with incorrect credentials");

  // Navigate to login page
  await page.goto(globalThis.E2E_LOGIN_URL);

  // Call step functions in sequence
  await insertIncorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifyRetryLogin(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});