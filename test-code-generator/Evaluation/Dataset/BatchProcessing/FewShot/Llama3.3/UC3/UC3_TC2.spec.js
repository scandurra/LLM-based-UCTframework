import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { tryAccessWithoutLogin, insertInvalidCredentials } from './UC3_TC2.functions.js';

test("UC3_TC2 - Tentativo di accesso senza autenticazione", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3_TC2", "Tentativo di accesso senza autenticazione");

  await tryAccessWithoutLogin(page, reporter);
  await insertInvalidCredentials(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});