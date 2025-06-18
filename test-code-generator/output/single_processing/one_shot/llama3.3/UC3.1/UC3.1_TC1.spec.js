import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

import { openCensusSheetsSection, sortColumns, scrollColumns } from './UC3.1_TC1.functions.js';

test("UC3.1_TC1 - Visualizzazione schede censimento con dati validi e ordinamento", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.1_TC1", "Visualizzazione schede censimento con dati validi e ordinamento");

  // Preconditions: UC1
  await page.goto(process.env.E2E_LOGIN_URL);
  await (await import('../UC1/UC1_TC1.functions.js')).insertCorrectCredentials(page, null);
  await (await import('../UC1/UC1_TC1.functions.js')).clickLoginButton(page, null);
  await (await import('../UC1/UC1_TC1.functions.js')).verifySuccessMessage(page, null);

  // Preconditions: UC3
  await openCensusSheetsInterface(page, null);

  // Call step functions in sequence
  await openCensusSheetsSection(page, reporter);
  await sortColumns(page, reporter);
  await scrollColumns(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});