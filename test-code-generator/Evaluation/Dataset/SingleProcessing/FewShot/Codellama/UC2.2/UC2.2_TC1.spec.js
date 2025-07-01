import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectDashboard } from '../UC2/UC2_TC1.functions.js' // Reuse existing function in the prompt without redefining them
import { loginAsRegisteredUser, selectComuneAndParameters, confirmSearch, visualizeDetails } from './UC2.2_TC1.functions.js';

test("UC2_TC1 - Ricerca impianti di illuminazione con parametri validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1", "Ricerca impianti di illuminazione con parametri validi");

  await loginAsRegisteredUser(page, null); // Reuse existing function in the prompt without redefining it
  await selectDashboard(page, reporter); // Reuse existing function in the prompt without redefining it
  await selectComuneAndParameters(page, reporter);
  await confirmSearch(page, reporter);
  await visualizeDetails(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});