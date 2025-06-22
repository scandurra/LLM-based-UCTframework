import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from './UC3_TC1.functions.js';

test("UC3_TC1 - Apertura interfaccia gestione schede censimento con successo", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3_TC1", "Apertura interfaccia gestione schede censimento con successo");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAndAuthenticate(page, reporter);
  await selectCensusSheetMenu(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});