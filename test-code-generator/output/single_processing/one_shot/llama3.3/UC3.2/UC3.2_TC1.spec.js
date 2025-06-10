import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

import { searchCensusSheets, executeSearch, verifySearchResults } from './UC3.2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC3.2_TC1 - Ricerca con parametri validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.2_TC1 - Ricerca con parametri validi");

  // Preconditions: UC1
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);

  // Preconditions: UC3
  await openCensusSheetsInterface(page, null);

  // Test Steps
  await searchCensusSheets(page, reporter);
  await executeSearch(page, reporter);
  await verifySearchResults(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});