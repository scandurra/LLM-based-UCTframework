import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectMultipleCities, selectValidKPI, confirmRequest } from './UC2.4_TC1.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC1", "Selezione di comuni e KPI validi per benchmarking");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);

  await selectMultipleCities(page, reporter);
  await selectValidKPI(page, reporter);
  await confirmRequest(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});