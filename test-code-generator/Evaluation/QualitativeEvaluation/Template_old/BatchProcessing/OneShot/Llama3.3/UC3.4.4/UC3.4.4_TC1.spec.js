import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, selectFreezeOperation, confirmFreezeOperation, verifySheetStatusAfterFreeze } from './UC3.4.4_TC1.functions.js';

test("UC3.4.4_TC1 - Congelamento scheda censimento con conferma", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.4_TC1", "Congelamento scheda censimento con conferma");

  await accessCensusSheetSection(page, reporter);
  await selectFreezeOperation(page, reporter);
  await confirmFreezeOperation(page, reporter);
  await verifySheetStatusAfterFreeze(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});