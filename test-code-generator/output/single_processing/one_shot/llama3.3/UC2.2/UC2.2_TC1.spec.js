import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { openDashboard } from '../UC2/UC2_TC1.functions.js';

import { selectComuneAndSearch, confirmSearch, visualizeImpiantiDetails } from './UC2.2_TC1.functions.js';

test("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Reuse existing methods from UC1 and UC2
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  await openDashboard(page, reporter);

  await selectComuneAndSearch(page, reporter);
  await confirmSearch(page, reporter);
  await visualizeImpiantiDetails(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});