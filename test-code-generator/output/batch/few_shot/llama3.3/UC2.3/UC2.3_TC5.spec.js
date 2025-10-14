import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToTableSorting, clickOnColumnsToSortMultiple, verifySortingFunctionalityMultiple } from './UC2.3_TC5.functions.js';

test("UC2.3_TC5 - Visualizzazione tabella dati generali con ordinamento su più colonne", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC5", "Visualizzazione tabella dati generali con ordinamento su più colonne");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessAndScrollToTableSorting(page, reporter);
  await clickOnColumnsToSortMultiple(page, reporter);
  await verifySortingFunctionalityMultiple(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});