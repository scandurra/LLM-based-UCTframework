import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSectionTC5, selectAndCancelAction } from './UC3.4_TC5.functions.js';

test("UC3.4_TC5 - Annullamento dell’azione selezionata", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4_TC5", "Annullamento dell’azione selezionata");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessCensusSheetSectionTC5(page, reporter);
  await selectAndCancelAction(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});