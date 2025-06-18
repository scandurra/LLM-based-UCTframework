import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { selectMultipleComuni, confirmSearchWithMultipleComuni } from './UC2.2_TC4.functions.js';

test("UC2.2_TC4 - Ricerca con più comuni", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.2_TC4", "Ricerca con più comuni");

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await page.goto(process.env.E2E_DASHBOARD_URL);
  await selectMultipleComuni(page, reporter);
  await confirmSearchWithMultipleComuni(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});