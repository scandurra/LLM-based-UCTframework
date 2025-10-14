import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { accessPortalAndClickUsername, selectLanguageAndRepeat, verifyPortalRemainsInSelectedLanguage } from './UC5_TC4.functions.js';

test("UC5_TC4 - Cambio lingua ripetuto", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC4", "Cambio lingua ripetuto");

  await page.goto(process.env.E2E_LOGIN_URL);

  await insertCorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifySuccessMessage(page, reporter);

  await accessPortalAndClickUsername(page, reporter);
  await selectLanguageAndRepeat(page, reporter);
  await verifyPortalRemainsInSelectedLanguage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});