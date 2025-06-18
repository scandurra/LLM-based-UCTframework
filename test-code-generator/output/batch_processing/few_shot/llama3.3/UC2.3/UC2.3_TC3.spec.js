import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToGeneralDataTableNonExistingComune, selectNonExistingComune, verifyErrorMessage } from './UC2.3_TC3.functions.js';

test("UC2.3_TC3 - Visualizzazione tabella dati generali con selezione di comuni non esistenti", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC3", "Visualizzazione tabella dati generali con selezione di comuni non esistenti");

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessAndScrollToGeneralDataTableNonExistingComune(page, reporter);
  await selectNonExistingComune(page, reporter);
  await verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});