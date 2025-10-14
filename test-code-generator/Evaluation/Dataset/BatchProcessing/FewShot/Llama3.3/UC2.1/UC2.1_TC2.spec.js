import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { clickDownloadButton, cancelDownloadRequest, verifyErrorMessage } from './UC2.1_TC2.functions.js';

test("UC2.1_TC2 - Download PDF con errore di conferma", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC2", "Download PDF con errore di conferma");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await clickDownloadButton(page, reporter);
  await cancelDownloadRequest(page, reporter);
  await verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});