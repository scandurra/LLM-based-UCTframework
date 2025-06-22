import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from '../UC3.4/UC3.4_TC1.functions.js';

import { downloadCensusSheet, waitDownloadCompletion } from './UC3.4.1_TC1.functions.js';

test("UC3.4.1_TC1 - Download census sheet with success", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.1_TC1", "Download census sheet with success");

  // Preconditions
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await authenticateAndOpenDashboard(page, null);
  await accessCensusSheetsSection(page, reporter);
  await visualizeAvailableActions(page, reporter);
  await downloadCensusSheet(page, reporter);
  await waitDownloadCompletion(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});