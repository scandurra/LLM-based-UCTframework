import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickOnDownloadPDFButton } from './UC2.1_TC1.functions.js';

import { loginAsRegisteredUser, selectDashboard } from '../UC2/UC2_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton } from '../UC1/UC1_TC1.functions.js';

test("UC2.1_TC1 - Download PDF con successo", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC1", "Download PDF con successo");

  await loginAsRegisteredUser(page, null);
  await selectDashboard(page, null);
  await clickOnDownloadPDFButton(page, reporter);
  // TODO: Implement steps 2 and 3

  reporter.onTestEnd(test, { status: "passed" });
});