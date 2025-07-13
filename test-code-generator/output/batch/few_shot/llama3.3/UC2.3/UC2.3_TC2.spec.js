import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToGeneralDataTable, clickOnColumnsToSort, verifySorting } from './UC2.3_TC2.functions.js';

test("UC2.3_TC2 - Visualizzazione tabella dati generali con ordinamento su più colonne", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC2", "Visualizzazione tabella dati generali con ordinamento su più colonne");

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessAndScrollToGeneralDataTable(page, reporter);
  await clickOnColumnsToSort(page, reporter);
  await verifySorting(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});