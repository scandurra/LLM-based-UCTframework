import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, verifyPresenceOfElements } from './UC3_TC4.functions.js';

test("UC3_TC4 - Verifica della presenza di tutti gli elementi nella sezione schede censimento", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3_TC4", "Verifica della presenza di tutti gli elementi nella sezione schede censimento");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAndAuthenticate(page, null);
  await accessCensusSheetSection(page, reporter);
  await verifyPresenceOfElements(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});