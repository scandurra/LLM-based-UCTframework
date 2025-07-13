import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from './UC3.4_TC1.functions.js';

import { authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

test("UC3.4_TC1 - Visualize available actions on census sheet", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4_TC1", "Visualize available actions on census sheet");

  // Preconditions
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await authenticateAndOpenDashboard(page, reporter);
  await accessCensusSheetsSection(page, reporter);
  await visualizeAvailableActions(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});