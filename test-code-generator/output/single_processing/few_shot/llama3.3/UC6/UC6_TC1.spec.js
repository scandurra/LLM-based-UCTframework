import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { clickOnUsernameAndSelectLogout, verifyLogoutSuccessMessage } from './UC6_TC1.functions.js';

test("UC6_TC1 - Logout user with success", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC6_TC1", "Logout user with success");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence for UC1
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifyAuthenticationSuccessMessage(page, null);

  // Call step functions in sequence for UC6
  await clickOnUsernameAndSelectLogout(page, reporter);
  await verifyLogoutSuccessMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});