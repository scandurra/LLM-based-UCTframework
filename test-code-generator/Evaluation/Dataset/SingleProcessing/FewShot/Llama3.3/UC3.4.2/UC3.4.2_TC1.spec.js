import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDeleteOperation, confirmDeletion } from './UC3.4.2_TC1.functions.js';

import { authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from '../UC3.4/UC3.4_TC1.functions.js';

test("UC3.4.2_TC1 - Delete census sheet with confirmation", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.2_TC1", "Delete census sheet with confirmation");

  // Preconditions
  await authenticateAndOpenDashboard(page, null);
  await accessCensusSheetsSection(page, null);
  await visualizeAvailableActions(page, null);

  // Call step functions in sequence
  await selectDeleteOperation(page, reporter);
  await confirmDeletion(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});