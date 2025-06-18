import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformOnMobileDevice, verifyDashboardOnMobile } from './UC2_TC5.functions.js';

test("UC2_TC5 - Apertura della dashboard su dispositivo mobile", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC5", "Apertura della dashboard su dispositivo mobile");

  await accessPlatformOnMobileDevice(page, reporter);
  await verifyDashboardOnMobile(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});