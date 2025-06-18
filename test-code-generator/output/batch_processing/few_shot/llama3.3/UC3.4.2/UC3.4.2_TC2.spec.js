import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import { selectDeleteOperationTC2, cancelDelete } from './UC3.4.2_TC2.functions.js';

test("UC3.4.2_TC2 - Annullamento eliminazione scheda censimento", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.2_TC2", "Annullamento eliminazione scheda censimento");

  await accessCensusSheetSection(page, reporter);
  await selectDeleteOperationTC2(page, reporter);
  await cancelDelete(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});