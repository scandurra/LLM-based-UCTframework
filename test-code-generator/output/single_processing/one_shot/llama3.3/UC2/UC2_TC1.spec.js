import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { openDashboard } from './UC2_TC1.functions.js';

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1 - Apertura della dashboard con utente autorizzato");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Reuse existing methods from UC1
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);

  await openDashboard(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});