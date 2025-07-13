import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import { selectDeleteOperationTC5, confirmDeleteTC5 } from './UC3.4.2_TC5.functions.js';

test("UC3.4.2_TC5 - Usabilità: eliminazione di scheda censimento con messaggio di conferma chiaro", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.2_TC5", "Usabilità: eliminazione di scheda censimento con messaggio di conferma chiaro");

  await accessCensusSheetSection(page, reporter);
  await selectDeleteOperationTC5(page, reporter);
  await confirmDeleteTC5(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});