import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToGeneralDataTableQuickSearch, insertQuickSearch, verifyQuickSearchResults } from './UC2.3_TC5.functions.js';

test("UC2.3_TC5 - Visualizzazione tabella dati generali con ricerca rapida", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC5", "Visualizzazione tabella dati generali con ricerca rapida");

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessAndScrollToGeneralDataTableQuickSearch(page, reporter);
  await insertQuickSearch(page, reporter);
  await verifyQuickSearchResults(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});