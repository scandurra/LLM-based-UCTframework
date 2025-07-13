import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { clickDownloadButton, confirmDownloadRequest, verifySuccessMessage } from './UC2.1_TC1.functions.js';

test("UC2.1_TC1 - Download PDF con successo", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC1", "Download PDF con successo");

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await clickDownloadButton(page, reporter);
  await confirmDownloadRequest(page, reporter);
  await verifySuccessMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});