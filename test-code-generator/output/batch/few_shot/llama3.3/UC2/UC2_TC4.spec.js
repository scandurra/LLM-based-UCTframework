import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformWithDifferentBrowsers, verifyAbsenceOfVisualizationProblems } from './UC2_TC4.functions.js';

test("UC2_TC4 - Verifica della compatibilità con diversi browser", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC4", "Verifica della compatibilità con diversi browser");

  await accessPlatformWithDifferentBrowsers(page, reporter);
  await verifyAbsenceOfVisualizationProblems(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});