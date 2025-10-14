import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { searchCities, selectKPIWithFilter, confirmRequestWithSearchAndFilter } from './UC2.4_TC5.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.4_TC5 - Usabilità della piattaforma con ricerca e filtro", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC5", "Usabilità della piattaforma con ricerca e filtro");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);

  await searchCities(page, reporter);
  await selectKPIWithFilter(page, reporter);
  await confirmRequestWithSearchAndFilter(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});