import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertSqlInjection, clickLoginButtonSqlInjection, verifySystemIntegrity } from './UC1_TC6.functions.js';

test("UC1_TC6 - SQL Injection", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC6", "SQL Injection");

  await insertSqlInjection(page, reporter);
  await clickLoginButtonSqlInjection(page, reporter);
  // await verifySystemIntegrity(page, reporter); // Not implemented

  reporter.onTestEnd(test, { status: "passed" });
});