import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginAsRegisteredUser, selectDashboard } from '../UC2/UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton } from '../UC1/UC1_TC1.functions.js';

test("UC2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1", "Ricerca impianti di illuminazione con parametri validi");

  await loginAsRegisteredUser(page, null);
  await selectDashboard(page, null);
  await selectComuneAndParameters(page, reporter);
  await confirmSearch(page, reporter);
  await viewDetails(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});