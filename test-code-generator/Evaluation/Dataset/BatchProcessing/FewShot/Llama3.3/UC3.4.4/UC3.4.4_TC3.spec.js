import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, selectMultipleSheetsForFreeze, confirmFreezeOfMultipleSheets, verifyStatusOfAllSheetsAfterFreeze } from './UC3.4.4_TC3.functions.js';

test("UC3.4.4_TC3 - Congelamento di più schede censimento", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.4_TC3", "Congelamento di più schede censimento");

  await accessCensusSheetSection(page, reporter);
  await selectMultipleSheetsForFreeze(page, reporter);
  await confirmFreezeOfMultipleSheets(page, reporter);
  await verifyStatusOfAllSheetsAfterFreeze(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});