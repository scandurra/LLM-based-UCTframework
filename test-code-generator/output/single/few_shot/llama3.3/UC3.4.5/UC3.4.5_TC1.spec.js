import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDetailOperation, verifyGeneralData, navigateHierarchy } from './UC3.4.5_TC1.functions.js';

import { authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

test("UC3.4.5_TC1 - Visualize detail of census sheet with valid data", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.5_TC1", "Visualize detail of census sheet with valid data");

  // Preconditions
  await authenticateAndOpenDashboard(page, null);

  // Call step functions in sequence
  await selectDetailOperation(page, reporter);
  await verifyGeneralData(page, reporter);
  await navigateHierarchy(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});