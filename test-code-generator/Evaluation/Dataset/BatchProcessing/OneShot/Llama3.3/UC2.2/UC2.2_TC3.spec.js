import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { insertInvalidParameters, tryToConfirmSearchWithInvalidParameters } from './UC2.2_TC3.functions.js';

test("UC2.2_TC3 - Ricerca con parametri non validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.2_TC3", "Ricerca con parametri non validi");

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await page.goto(process.env.E2E_DASHBOARD_URL);
  await insertInvalidParameters(page, reporter);
  await tryToConfirmSearchWithInvalidParameters(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});