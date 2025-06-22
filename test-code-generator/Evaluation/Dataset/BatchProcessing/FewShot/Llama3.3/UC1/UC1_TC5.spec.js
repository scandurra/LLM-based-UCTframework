import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertInvalidCharacters, clickLoginButtonInvalidCharacters, verifyInvalidCharactersErrorMessage } from './UC1_TC5.functions.js';

test("UC1_TC5 - Tentativo di login con caratteri non validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC5", "Tentativo di login con caratteri non validi");

  await page.goto(process.env.E2E_LOGIN_URL);

  await insertInvalidCharacters(page, reporter);
  await clickLoginButtonInvalidCharacters(page, reporter);
  await verifyInvalidCharactersErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});