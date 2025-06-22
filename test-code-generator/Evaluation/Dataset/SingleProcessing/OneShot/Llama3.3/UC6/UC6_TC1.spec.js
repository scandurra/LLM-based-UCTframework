import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { clickOnUsernameAndSelectLogout, verifyLogoutSuccessMessage } from './UC6_TC1.functions.js';

test("UC6_TC1 - Logout utente con successo", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC6_TC1", "Logout utente con successo");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence for UC1
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);

  // Call step functions in sequence for UC6
  await clickOnUsernameAndSelectLogout(page, reporter);
  await verifyLogoutSuccessMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});