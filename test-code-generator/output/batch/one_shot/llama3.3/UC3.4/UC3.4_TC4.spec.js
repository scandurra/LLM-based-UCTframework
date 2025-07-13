import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSectionTC4, selectMultipleActions } from './UC3.4_TC4.functions.js';

test("UC3.4_TC4 - Selezione multipla di azioni sulla stessa scheda censimento", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4_TC4", "Selezione multipla di azioni sulla stessa scheda censimento");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessCensusSheetSectionTC4(page, reporter);
  await selectMultipleActions(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});