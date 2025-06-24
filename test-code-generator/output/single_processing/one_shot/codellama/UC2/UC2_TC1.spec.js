import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToLoginPage, insertCorrectCredentials, clickLoginButton } from '../UC1/UC1_TC1.functions.js';

import { navigateToDashboard, selectDashboardLink } from './UC2_TC1.functions.js';

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1", "Apertura della dashboard con utente autorizzato");
  
  await navigateToLoginPage(page, null);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await navigateToDashboard(page, null);
  await selectDashboardLink(page, null);
  
  reporter.onTestEnd(test, { status: "passed" });
});