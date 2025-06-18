import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToLoginPage, insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

import { clickOnUsername, selectItalianLanguage, verifyItalianLanguage } from './UC5_TC1.functions.js';

test("UC5_TC1 - Select Italian language", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC1", "Select Italian language");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence for UC1
  await navigateToLoginPage(page, null);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifyAuthenticationSuccessMessage(page, null);

  // Call step functions in sequence for UC5
  await clickOnUsername(page, reporter);
  await selectItalianLanguage(page, reporter);
  await verifyItalianLanguage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});