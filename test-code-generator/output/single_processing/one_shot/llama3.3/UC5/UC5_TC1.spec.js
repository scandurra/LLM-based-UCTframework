import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickOnUsername, selectItalianLanguage, verifyItalianLanguage } from './UC5_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC5_TC1 - Selezione lingua italiana", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC1", "Selezione lingua italiana");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence for UC1
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);

  // Call step functions in sequence for UC5
  await clickOnUsername(page, reporter);
  await selectItalianLanguage(page, reporter);
  await page.reload();
  await verifyItalianLanguage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});