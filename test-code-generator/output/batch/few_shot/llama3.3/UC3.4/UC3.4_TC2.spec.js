import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSectionTC2, clickNonSupportedAction } from './UC3.4_TC2.functions.js';

test("UC3.4_TC2 - Selezione di un’azione non disponibile", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4_TC2", "Selezione di un’azione non disponibile");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessCensusSheetSectionTC2(page, reporter);
  await clickNonSupportedAction(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});