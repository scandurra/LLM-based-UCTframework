import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import { clickCaricamentoSchedeCensimentoButton, leaveFileSelectionEmpty, tryToProceedWithUpload } from './UC3.3_TC4.functions.js';

test("UC3.3_TC4 - Caricamento scheda censimento senza selezionare file", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.3_TC4", "Caricamento scheda censimento senza selezionare file");

  // Navigate to login page
  await page.goto(process.env.E2E_LOGIN_URL);

  // Call step functions in sequence
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  await openCensusSheetSection(page, null);
  await clickCaricamentoSchedeCensimentoButton(page, reporter);
  await leaveFileSelectionEmpty(page, reporter);
  await tryToProceedWithUpload(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});