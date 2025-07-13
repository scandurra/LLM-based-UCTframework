import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { accessDashboardSection, scrollDownToGeneralDataTable, verifyScrollingAndSelection } from './UC2.3_TC1.functions.js';

test("UC2.3_TC1 - Visualizzazione tabella dati generali con impostazioni predefinite", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC1", "Visualizzazione tabella dati generali con impostazioni predefinite");

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessDashboardSection(page, reporter);
  await scrollDownToGeneralDataTable(page, reporter);
  await verifyScrollingAndSelection(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});