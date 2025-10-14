import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToTableInvalid, insertInvalidNumberOfRows, verifySystemBehavior } from './UC2.3_TC4.functions.js';

test("UC2.3_TC4 - Visualizzazione tabella dati generali con inserimento di numeri di righe non validi", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC4", "Visualizzazione tabella dati generali con inserimento di numeri di righe non validi");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessAndScrollToTableInvalid(page, reporter);
  await insertInvalidNumberOfRows(page, reporter);
  await verifySystemBehavior(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});