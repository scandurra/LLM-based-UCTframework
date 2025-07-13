import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, enterInvalidDataDuringFreeze, verifySheetStatusAfterInvalidData } from './UC3.4.4_TC5.functions.js';

test("UC3.4.4_TC5 - Congelamento scheda censimento con dati non validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.4_TC5", "Congelamento scheda censimento con dati non validi");

  await accessCensusSheetSection(page, reporter);
  await enterInvalidDataDuringFreeze(page, reporter);
  await verifySheetStatusAfterInvalidData(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});