import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { clickDownloadButtonWithoutConfirmation, verifyNoDownload } from './UC2.1_TC3.functions.js';

test("UC2.1_TC3 - Download PDF senza conferma", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC3", "Download PDF senza conferma");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await clickDownloadButtonWithoutConfirmation(page, reporter);
  await verifyNoDownload(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});