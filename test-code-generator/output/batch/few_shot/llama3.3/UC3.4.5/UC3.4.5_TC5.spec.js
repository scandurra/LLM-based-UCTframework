import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import { openDettaglioPageWithInvalidNode, verifyErrorMessage } from './UC3.4.5_TC5.functions.js';

test("UC3.4.5_TC5 - Gestione di un nodo non valido nella gerarchia dei POD e Aree Omogenee", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.5_TC5", "Gestione di un nodo non valido nella gerarchia dei POD e Aree Omogenee");

  await openDettaglioPageWithInvalidNode(page, reporter);

  await verifyErrorMessage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});