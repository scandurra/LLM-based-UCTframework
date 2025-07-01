import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectCommunes, selectKPI, confirmRequest } from './UC2.4_TC1.functions.js';

import { loginAsRegisteredUser, selectDashboard } from '../UC2_TC1.spec.js';

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC1", "Selezione di comuni e KPI validi per benchmarking");
  await loginAsRegisteredUser(page, reporter);
  await selectDashboard(page, reporter);
  await selectCommunes(page, reporter);
  await selectKPI(page, reporter);
  await confirmRequest(page, reporter);
  reporter.onTestEnd(test, { status: "passed" });
});