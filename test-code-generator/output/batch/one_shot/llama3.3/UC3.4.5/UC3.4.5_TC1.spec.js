import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import { selectDettaglioOperation, verifyGeneralData, navigateHierarchy } from './UC3.4.5_TC1.functions.js';

test("UC3.4.5_TC1 - Visualizzazione dettaglio scheda censimento con dati validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.5_TC1", "Visualizzazione dettaglio scheda censimento con dati validi");

  await accessCensusSheetSection(page, reporter);

  await selectDettaglioOperation(page, reporter);
  await verifyGeneralData(page, reporter);
  await navigateHierarchy(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});