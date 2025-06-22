import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, tryToFreezeWithoutSelectingSheet, verifySheetStatusAfterFailedFreeze } from './UC3.4.4_TC4.functions.js';

test("UC3.4.4_TC4 - Congelamento scheda censimento senza selezione", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.4_TC4", "Congelamento scheda censimento senza selezione");

  await accessCensusSheetSection(page, reporter);
  await tryToFreezeWithoutSelectingSheet(page, reporter);
  await verifySheetStatusAfterFailedFreeze(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});