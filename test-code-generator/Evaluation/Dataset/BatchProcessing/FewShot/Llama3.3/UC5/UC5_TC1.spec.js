import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { accessPortalAndClickUsername, selectItalianLanguage, verifyPortalInItalian } from './UC5_TC1.functions.js';

test("UC5_TC1 - Selezione lingua italiana", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC1", "Selezione lingua italiana");

  await page.goto(process.env.E2E_LOGIN_URL);

  await insertCorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await verifySuccessMessage(page, reporter);

  await accessPortalAndClickUsername(page, reporter);
  await selectItalianLanguage(page, reporter);
  await verifyPortalInItalian(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});