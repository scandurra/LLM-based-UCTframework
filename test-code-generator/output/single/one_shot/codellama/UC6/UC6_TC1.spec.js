import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToLoginPage, clickLogoutButton, confirmLogout } from './UC6_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC6_TC1 - Logout utente con successo", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC6_TC1", "Logout utente con successo");
  
  await navigateToLoginPage(page, null);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  await clickLogoutButton(page, null);
  await confirmLogout(page, null);
  
  reporter.onTestEnd(test, { status: "passed" });
});