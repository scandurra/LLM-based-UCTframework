import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToUserIcon, selectItalianLanguage, verifyItalianLanguage } from './UC5_TC1.functions.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

test("UC5_TC1 - Selezione lingua italiana", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC1", "Selezione lingua italiana");

  // Reuse existing method in the prompt without redefining them
  await navigateToUserIcon(page, null);
  await selectItalianLanguage(page, null);
  await verifyItalianLanguage(page, null);

  reporter.onTestEnd(test, { status: "passed" });
});