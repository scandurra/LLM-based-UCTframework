import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertIncorrectCredentials, clickLoginButton, verifyRetryOption } from './UC1_TC2.functions.js';

test("UC1_TC2 - Login with incorrect credentials", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC2", "Login with incorrect credentials");

  await page.goto(process.env.E2E_BASE_URL + '/login');

  // Call step functions in sequence
  await insertIncorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifyRetryOption(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});