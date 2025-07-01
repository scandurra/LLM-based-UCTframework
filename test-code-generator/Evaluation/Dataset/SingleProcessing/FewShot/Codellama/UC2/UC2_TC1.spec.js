import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginAsRegisteredUser, selectDashboard } from './UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton } from '../UC1/UC1_TC1.functions.js';

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1", "Apertura della dashboard con utente autorizzato");

  await loginAsRegisteredUser(page, reporter);
  await selectDashboard(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});