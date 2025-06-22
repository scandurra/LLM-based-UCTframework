import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessSearchSection, searchWithValidParameters, executeSearch } from './UC3.2_TC1.functions.js';

test("UC3.2_TC1 - Search with valid parameters", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.2_TC1", "Search with valid parameters");

  // Preconditions
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await accessSearchSection(page, reporter);
  await searchWithValidParameters(page, reporter);
  await executeSearch(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});