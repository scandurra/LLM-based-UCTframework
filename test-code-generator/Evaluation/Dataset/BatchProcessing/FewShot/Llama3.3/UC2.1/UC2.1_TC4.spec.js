import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { clickDownloadButtonAndCancel, repeatDownloadRequest, verifySuccessMessageAfterRepeat } from './UC2.1_TC4.functions.js';

test("UC2.1_TC4 - Download PDF con ripetizione della richiesta", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC4", "Download PDF con ripetizione della richiesta");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await clickDownloadButtonAndCancel(page, reporter);
  await repeatDownloadRequest(page, reporter);
  await verifySuccessMessageAfterRepeat(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});