import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection } from './UC3.4.4_TC6.functions.js';

test("UC3.4.4_TC6 - Congelamento scheda censimento con utente non autorizzato", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.4_TC6", "Congelamento scheda censimento con utente non autorizzato");

  await accessCensusSheetSection(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});