import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton } from '../UC1/UC1_TC1.functions.js';

import { accessCensusSheetSectionForUsability, performUsabilityActions } from './UC3_TC5.functions.js';

test("UC3_TC5 - Test di usabilità della sezione schede censimento", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3_TC5", "Test di usabilità della sezione schede censimento");

  await page.goto(process.env.E2E_LOGIN_URL);

  await insertCorrectCredentials(page, reporter);
  await clickLoginButton(page, reporter);
  await accessCensusSheetSectionForUsability(page, reporter);
  await performUsabilityActions(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});