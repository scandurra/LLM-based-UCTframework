import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginAsRegisteredUser, selectDashboard } from '../UC2/UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton } from '../UC1/UC1_TC1.functions.js';

test("UC2_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1", "Selezione di comuni e KPI validi per benchmarking");

  await loginAsRegisteredUser(page, reporter);
  await selectDashboard(page, reporter);
  await selectCommunes(page, reporter);
  await selectKPI(page, reporter);
  await confirmRequest(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});