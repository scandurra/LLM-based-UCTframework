import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDashboard } from '../UC2/UC2_TC1.functions.js' // Reuse existing function to navigate to dashboard page
import { selectComuneAndParameters, confirmSearch, visualizeDetails } from './UC2.2_TC1.functions.js';

test("UC2.2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.2_TC1", "Ricerca impianti di illuminazione con parametri validi");

  await selectDashboard(page, null); // Reuse existing function to navigate to dashboard page
  await selectComuneAndParameters(page, reporter);
  await confirmSearch(page, reporter);
  await visualizeDetails(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});