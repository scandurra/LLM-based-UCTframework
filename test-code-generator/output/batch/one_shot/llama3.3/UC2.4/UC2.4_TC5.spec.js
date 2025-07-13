import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { searchForCities, selectKPIUsingFilter, confirmRequestWithSearchedCitiesAndFilteredKPI } from './UC2.4_TC5.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.4_TC5 - Usabilità della piattaforma: ricerca di comuni e selezione di KPI", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC5", "Usabilità della piattaforma: ricerca di comuni e selezione di KPI");

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);
  await searchForCities(page, reporter);
  await selectKPIUsingFilter(page, reporter);
  await confirmRequestWithSearchedCitiesAndFilteredKPI(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});