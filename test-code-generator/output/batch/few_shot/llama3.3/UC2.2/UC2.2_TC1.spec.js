import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { selectComuneAndSearch, confirmSearch, visualizeDetails } from './UC2.2_TC1.functions.js';

test("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.2_TC1", "Ricerca impianti di illuminazione con parametri validi");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await selectComuneAndSearch(page, reporter);
  await confirmSearch(page, reporter);
  await visualizeDetails(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});