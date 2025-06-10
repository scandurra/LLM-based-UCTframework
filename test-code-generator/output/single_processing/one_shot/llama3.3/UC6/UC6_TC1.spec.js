import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { clickOnUsernameAndSelectLogout, verifyLogoutSuccessMessage } from './UC6_TC1.functions.js';

test("UC6_TC1 - Logout utente con successo", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC6_TC1 - Logout utente con successo");

  // Reuse existing method in the prompt without redefining them
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);

  await clickOnUsernameAndSelectLogout(page, reporter);
  await verifyLogoutSuccessMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});