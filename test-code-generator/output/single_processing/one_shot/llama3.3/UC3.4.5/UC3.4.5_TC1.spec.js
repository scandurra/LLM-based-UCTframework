import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetsInterface } from '../UC3/UC3_TC1.functions.js';

import { selectDettaglioOperation, verifyGeneralData, navigateGerarchia } from './UC3.4.5_TC1.functions.js';

test("UC3.4.5_TC1 - Visualizzazione dettaglio scheda censimento con dati validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.5_TC1", "Visualizzazione dettaglio scheda censimento con dati validi");

  // Preconditions: UC3
  await page.goto(process.env.E2E_CTS_URL);
  await openCensusSheetsInterface(page, null);

  // Call step functions in sequence
  await selectDettaglioOperation(page, reporter);
  await verifyGeneralData(page, reporter);
  await navigateGerarchia(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});