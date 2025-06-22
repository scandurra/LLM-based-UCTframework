import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from './UC3.4_TC1.functions.js';

import { selectFreezeOperation, confirmFreezeOperation, verifySheetStatus } from './UC3.4.4_TC1.functions.js';

test("UC3.4.4_TC1 - Freeze census sheet with confirmation", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.4_TC1", "Freeze census sheet with confirmation");

  // Preconditions
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await authenticateAndOpenDashboard(page, null);
  await accessCensusSheetsSection(page, reporter);
  await visualizeAvailableActions(page, reporter);
  await selectFreezeOperation(page, reporter);
  await confirmFreezeOperation(page, reporter);
  await verifySheetStatus(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});