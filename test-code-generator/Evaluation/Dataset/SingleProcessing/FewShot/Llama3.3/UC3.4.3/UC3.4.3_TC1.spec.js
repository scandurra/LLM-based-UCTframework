import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectEditOperation, modifyFieldsWithValidData, confirmChanges } from './UC3.4.3_TC1.functions.js';

import { authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetsSection } from '../UC3.4/UC3.4_TC1.functions.js';

test("UC3.4.3_TC1 - Modify census sheet with valid data", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.3_TC1", "Modify census sheet with valid data");

  // Preconditions
  await authenticateAndOpenDashboard(page, null);
  await accessCensusSheetsSection(page, null);

  // Call step functions in sequence
  await selectEditOperation(page, reporter);
  await modifyFieldsWithValidData(page, reporter);
  await confirmChanges(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});