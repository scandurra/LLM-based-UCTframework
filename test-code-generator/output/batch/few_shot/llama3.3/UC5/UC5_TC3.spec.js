import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { accessPortalAndClickUsername, insertUnsupportedLanguage, verifyPortalRemainsInDefaultLanguage } from './UC5_TC3.functions.js';

test("UC5_TC3 - Selezione lingua non supportata", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC3", "Selezione lingua non supportata");

  await page.goto(process.env.E2E_LOGIN_URL);

  await insertCorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifySuccessMessage(page, reporter);

  await accessPortalAndClickUsername(page, reporter);
  await insertUnsupportedLanguage(page, reporter);
  await verifyPortalRemainsInDefaultLanguage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});