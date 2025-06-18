import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { selectComuneAndSearchParameters, confirmSearch, visualizeIlluminationPlantDetails } from './UC2.2_TC1.functions.js';

test("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.2_TC1", "Ricerca impianti di illuminazione con parametri validi");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await accessPlatform(page, reporter);
  await selectDashboardMenu(page, reporter);
  await page.goto(process.env.E2E_DASHBOARD_URL); // Navigate to dashboard page
  await selectComuneAndSearchParameters(page, reporter);
  await confirmSearch(page, reporter);
  await visualizeIlluminationPlantDetails(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});