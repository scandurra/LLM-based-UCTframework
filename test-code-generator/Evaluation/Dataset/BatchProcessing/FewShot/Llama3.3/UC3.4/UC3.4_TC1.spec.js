import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from './UC3.4_TC1.functions.js';

test("UC3.4_TC1 - Visualizzazione azioni disponibili sulla scheda censimento", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4_TC1", "Visualizzazione azioni disponibili sulla scheda censimento");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessCensusSheetSection(page, reporter);
  await clickAzioniButton(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});