import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { clickDownloadButton, verifyFileDownload } from './UC2.1_TC5.functions.js';

test("UC2.1_TC5 - Download PDF con verifica del file scaricato", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC5", "Download PDF con verifica del file scaricato");

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await clickDownloadButton(page, reporter);
  await verifyFileDownload(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});