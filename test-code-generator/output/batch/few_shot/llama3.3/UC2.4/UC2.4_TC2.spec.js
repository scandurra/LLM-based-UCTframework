import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { selectSingleCity, selectValidKPIWithoutCities, tryToConfirmRequestWithoutCities } from './UC2.4_TC2.functions.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

test("UC2.4_TC2 - Selezione di un solo comune per benchmarking", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.4_TC2", "Selezione di un solo comune per benchmarking");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await selectDashboardMenu(page, reporter);

  await selectSingleCity(page, reporter);
  await selectValidKPIWithoutCities(page, reporter);
  await tryToConfirmRequestWithoutCities(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});