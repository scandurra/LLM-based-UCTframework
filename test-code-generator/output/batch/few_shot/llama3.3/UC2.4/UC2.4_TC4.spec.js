import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectMaximumNumberOfCities, selectValidKPIWithMaximumNumberOfCities, confirmRequestWithMaximumNumberOfCities } from './UC2.4_TC4.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.4_TC4 - Boundary test: selezione del massimo numero di comuni consentito", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC4", "Boundary test: selezione del massimo numero di comuni consentito");

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await selectMaximumNumberOfCities(page, reporter);
  await selectValidKPIWithMaximumNumberOfCities(page, reporter);
  await confirmRequestWithMaximumNumberOfCities(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});