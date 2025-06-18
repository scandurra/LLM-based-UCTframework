import { test, expect } from '@playwright/test';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertWrongCredentials, clickLoginButton, retryLogin } from './UC1_TC2.functions.js';

test("UC1_TC2 - Login con credenziali errate", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC2", "Login con credenziali errate");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await insertWrongCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await retryLogin(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});