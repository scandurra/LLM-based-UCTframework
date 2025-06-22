import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsUnregisteredUser, tryToAccessDashboardDirectly } from './UC2_TC2.functions.js';

test("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC2", "Tentativo di accesso alla dashboard senza autorizzazione");

  await accessPlatformAsUnregisteredUser(page, reporter);
  await tryToAccessDashboardDirectly(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});