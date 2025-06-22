import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { leaveComuneEmpty, tryToConfirmSearch } from './UC2.2_TC2.functions.js';

test("UC2.2_TC2 - Ricerca senza selezionare il comune", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.2_TC2", "Ricerca senza selezionare il comune");

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await page.goto(process.env.E2E_DASHBOARD_URL);
  await leaveComuneEmpty(page, reporter);
  await tryToConfirmSearch(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});