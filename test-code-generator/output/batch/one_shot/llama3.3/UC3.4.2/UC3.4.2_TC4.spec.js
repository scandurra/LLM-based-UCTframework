import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import { selectMultipleDeleteOperations, confirmMultipleDeletions } from './UC3.4.2_TC4.functions.js';

test("UC3.4.2_TC4 - Boundary test: eliminazione di più schede contemporaneamente", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.2_TC4", "Boundary test: eliminazione di più schede contemporaneamente");

  await accessCensusSheetSection(page, reporter);
  await selectMultipleDeleteOperations(page, reporter);
  await confirmMultipleDeletions(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});