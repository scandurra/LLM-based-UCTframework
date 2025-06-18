import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectMultipleCitiesWithInvalidKPI, tryToConfirmRequestWithInvalidKPI } from './UC2.4_TC3.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.4_TC3 - Selezione di comuni e KPI non valido per benchmarking", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC3", "Selezione di comuni e KPI non valido per benchmarking");

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await selectMultipleCitiesWithInvalidKPI(page, reporter);
  await tryToConfirmRequestWithInvalidKPI(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});