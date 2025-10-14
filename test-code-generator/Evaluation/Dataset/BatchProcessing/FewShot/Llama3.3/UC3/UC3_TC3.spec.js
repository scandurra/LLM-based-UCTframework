import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton } from '../UC1/UC1_TC1.functions.js';

import { accessPlatformAndAuthenticateWithSpecialChars, selectCensusSheetMenuWithSpecialChars } from './UC3_TC3.functions.js';

test("UC3_TC3 - Selezione della sezione tramite menù laterale con caratteri speciali nel percorso", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3_TC3", "Selezione della sezione tramite menù laterale con caratteri speciali nel percorso");

  await page.goto(process.env.E2E_LOGIN_URL);

  await insertCorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await accessPlatformAndAuthenticateWithSpecialChars(page, reporter);
  await selectCensusSheetMenuWithSpecialChars(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});