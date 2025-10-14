import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToTable, clickOnColumnsToSort, verifySortingFunctionality } from './UC2.3_TC2.functions.js';

test("UC2.3_TC2 - Visualizzazione tabella dati generali con ordinamento su colonne", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC2", "Visualizzazione tabella dati generali con ordinamento su colonne");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessAndScrollToTable(page, reporter);
  await clickOnColumnsToSort(page, reporter);
  await verifySortingFunctionality(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});