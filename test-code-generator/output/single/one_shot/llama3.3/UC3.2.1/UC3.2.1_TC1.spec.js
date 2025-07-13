import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

import { insertValidSearchParameters, confirmSearch, visualizeDetails } from './UC3.2.1_TC1.functions.js';

test("UC3.2.1_TC1 - Ricerca scheda censimento per nome con risultati validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.2.1_TC1", "Ricerca scheda censimento per nome con risultati validi");

  // Preconditions: UC3.2
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  await openCensusSheetsInterface(page, null);

  // Call step functions in sequence
  await insertValidSearchParameters(page, reporter);
  await confirmSearch(page, reporter);
  await visualizeDetails(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});