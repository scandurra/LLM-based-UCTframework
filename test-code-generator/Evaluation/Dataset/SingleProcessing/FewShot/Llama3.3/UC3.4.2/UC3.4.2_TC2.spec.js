import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDeleteOperation, cancelDeletion } from './UC3.4.2_TC2.functions.js';

import { authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetsSection } from '../UC3.4/UC3.4_TC1.functions.js';

test("UC3.4.2_TC2 - Cancel deletion of census sheet", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.2_TC2", "Cancel deletion of census sheet");

  // Preconditions
  await authenticateAndOpenDashboard(page, null);
  await accessCensusSheetsSection(page, null);

  // Call step functions in sequence
  await selectDeleteOperation(page, reporter);
  await cancelDeletion(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});