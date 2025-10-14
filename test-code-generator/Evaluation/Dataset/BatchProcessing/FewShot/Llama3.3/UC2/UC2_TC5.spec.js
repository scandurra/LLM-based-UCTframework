import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformWithMobileDevice, verifyCorrectNavigation } from './UC2_TC5.functions.js';

test("UC2_TC5 - Apertura della dashboard con un dispositivo mobile", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC5", "Apertura della dashboard con un dispositivo mobile");

  await accessPlatformWithMobileDevice(page, reporter);
  await verifyCorrectNavigation(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});