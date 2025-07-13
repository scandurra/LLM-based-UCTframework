import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import { openDettaglioPageWithHierarchy, selectNodeInHierarchy, navigateBackInHierarchy } from './UC3.4.5_TC4.functions.js';

test("UC3.4.5_TC4 - Navigazione nella gerarchia dei POD e Aree Omogenee", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC3.4.5_TC4", "Navigazione nella gerarchia dei POD e Aree Omogenee");

  await openDettaglioPageWithHierarchy(page, reporter);

  await selectNodeInHierarchy(page, reporter);
  await navigateBackInHierarchy(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});