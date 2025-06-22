import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessSearchSection } from '../UC3.2/UC3.2_TC1.functions.js';

import { searchWithValidName, confirmSearch, viewCensusSheetDetails } from './UC3.2.1_TC1.functions.js';

test("UC3.2.1_TC1 - Search census sheet by name with valid results", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.2.1_TC1", "Search census sheet by name with valid results");

  // Preconditions
  await accessSearchSection(page, null);

  // Call step functions in sequence
  await searchWithValidName(page, reporter);
  await confirmSearch(page, reporter);
  await viewCensusSheetDetails(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});