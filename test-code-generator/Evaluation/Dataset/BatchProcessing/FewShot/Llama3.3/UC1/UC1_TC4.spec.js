import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertEmptyUsername, clickLoginButtonEmptyUsername, verifyErrorMessageEmptyUsername } from './UC1_TC4.functions.js';

test("UC1_TC4 - Lascia vuoto il campo username", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC4", "Lascia vuoto il campo username");

  await page.goto(process.env.E2E_LOGIN_URL);

  await insertEmptyUsername(page, reporter);
  await clickLoginButtonEmptyUsername(page, reporter);
  await verifyErrorMessageEmptyUsername(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});