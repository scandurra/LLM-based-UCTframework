import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessUserMenu, selectItalianLanguage, verifyItalianLanguage } from './UC5_TC1.functions.js';

import { navigateToLoginPage, insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC5_TC1 - Selezione lingua italiana", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC1", "Selezione lingua italiana");
  
  // Reuse existing method in the prompt without redefining them
  await navigateToLoginPage(page, null);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  
  await accessUserMenu(page, reporter);
  await selectItalianLanguage(page, reporter);
  await verifyItalianLanguage(page, reporter);
  
  reporter.onTestEnd(test, { status: "passed" });
});