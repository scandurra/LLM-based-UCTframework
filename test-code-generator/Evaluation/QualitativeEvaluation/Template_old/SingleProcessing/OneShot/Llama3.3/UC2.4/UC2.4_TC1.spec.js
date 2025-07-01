import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectCities, selectKPI, confirmRequest } from './UC2.4_TC1.functions.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC1", "Selezione di comuni e KPI validi per benchmarking");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await accessPlatform(page, reporter);
  await selectDashboardMenu(page, reporter);
  await page.goto(process.env.E2E_DASHBOARD_URL);
  await selectCities(page, reporter);
  await selectKPI(page, reporter);
  await confirmRequest(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});