import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { visualizeCensusSheets, sortCensusSheets, scrollCensusSheets } from './UC3.1_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

test("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento");

  // Preconditions: UC1 and UC3
  await page.goto(process.env.E2E_LOGIN_URL);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  await openCensusSheetsInterface(page, null);

  // Test Steps
  await visualizeCensusSheets(page, reporter);
  await sortCensusSheets(page, reporter);
  await scrollCensusSheets(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});