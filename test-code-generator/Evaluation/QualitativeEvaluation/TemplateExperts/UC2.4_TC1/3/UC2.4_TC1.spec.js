import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, openDashboard } from '../UC2/UC2_TC1.functions.js';

import { selectCities, selectKPI, confirmRequest } from './UC2.4_TC1.functions.js';

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC1", "Selezione di comuni e KPI validi per benchmarking");

  await accessPlatform(page, reporter);
  await openDashboard(page, reporter);

  await selectCities(page, reporter);
  await selectKPI(page, reporter);
  await confirmRequest(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});