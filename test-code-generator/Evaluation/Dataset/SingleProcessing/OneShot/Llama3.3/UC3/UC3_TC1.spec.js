import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { openCensusSheetSection } from './UC3_TC1.functions.js';

test("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3_TC1", "Apertura interfaccia gestione schede censimento con successo");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await insertCorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifySuccessMessage(page, reporter);
  await openCensusSheetSection(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});