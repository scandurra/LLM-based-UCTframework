import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformWithDifferentUserProfiles, verifyPresenceOfFunctionsAndSections } from './UC2_TC3.functions.js';

test("UC2_TC3 - Apertura della dashboard con diverse autorizzazioni", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC3", "Apertura della dashboard con diverse autorizzazioni");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformWithDifferentUserProfiles(page, reporter);
  await verifyPresenceOfFunctionsAndSections(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});