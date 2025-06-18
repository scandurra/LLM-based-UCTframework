import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

import { selectEditOperation, modifyFields, confirmChanges } from './UC3.4.3_TC1.functions.js';

test("UC3.4.3_TC1 - Modifica scheda censimento con dati validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.3_TC1", "Modifica scheda censimento con dati validi");

  // Preconditions: UC1
  await page.goto(process.env.E2E_LOGIN_URL);
  await (await import('../UC1/UC1_TC1.functions.js')).insertCorrectCredentials(page, null);
  await (await import('../UC1/UC1_TC1.functions.js')).clickLoginButton(page, null);
  await (await import('../UC1/UC1_TC1.functions.js')).verifySuccessMessage(page, null);

  // Preconditions: UC3.4
  await openCensusSheetsInterface(page, null);

  // Call step functions in sequence
  await selectEditOperation(page, reporter);
  await modifyFields(page, reporter);
  await confirmChanges(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});