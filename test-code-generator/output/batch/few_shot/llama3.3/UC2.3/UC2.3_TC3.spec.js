import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToTableNonExisting, selectNonExistingCity, verifyErrorMessage } from './UC2.3_TC3.functions.js';

test("UC2.3_TC3 - Visualizzazione tabella dati generali con selezione di comuni non esistenti", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC3", "Visualizzazione tabella dati generali con selezione di comuni non esistenti");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessAndScrollToTableNonExisting(page, reporter);
  await selectNonExistingCity(page, reporter);
  await verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});