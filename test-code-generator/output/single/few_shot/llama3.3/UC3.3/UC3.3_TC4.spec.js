import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { clickCaricamentoSchedeCensimentoButton, leaveFileSelectionEmptyAndCompileParameters, tryToProceedWithUpload } from './UC3.3_TC4.functions.js';

import { openCensusSheetInterface, authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

test("UC3.3_TC4 - Caricamento scheda censimento senza selezionare file", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.3_TC4", "Caricamento scheda censimento senza selezionare file");

  // Preconditions
  await authenticateAndOpenDashboard(page, null);
  await openCensusSheetInterface(page, null);

  // Call step functions in sequence
  await clickCaricamentoSchedeCensimentoButton(page, reporter);
  await leaveFileSelectionEmptyAndCompileParameters(page, reporter);
  await tryToProceedWithUpload(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});