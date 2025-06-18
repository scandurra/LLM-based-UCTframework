import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetInterface, authenticateAndOpenDashboard } from './UC3_TC1.functions.js';

test("UC3_TC1 - Open census sheet interface with success", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3_TC1", "Open census sheet interface with success");

  // Preconditions
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await authenticateAndOpenDashboard(page, reporter);
  await openCensusSheetInterface(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});