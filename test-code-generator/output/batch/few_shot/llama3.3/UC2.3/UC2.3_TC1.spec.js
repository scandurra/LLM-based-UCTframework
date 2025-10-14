import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser } from '../UC2/UC2_TC1.functions.js';

import { accessDashboardSection, scrollUntilTableVisible, verifyScrollingAndSelection } from './UC2.3_TC1.functions.js';

test("UC2.3_TC1 - Visualizzazione tabella dati generali con impostazioni predefinite", async ({page, browserName}) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC1", "Visualizzazione tabella dati generali con impostazioni predefinite");

  await page.goto(process.env.E2E_LOGIN_URL);

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessDashboardSection(page, reporter);
  await scrollUntilTableVisible(page, reporter);
  await verifyScrollingAndSelection(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });     
});