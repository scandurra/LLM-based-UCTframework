import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { accessAndScrollToGeneralDataTableInvalidElementsPerPage, insertInvalidElementsPerPage, verifySystemBehavior } from './UC2.3_TC4.functions.js';

test("UC2.3_TC4 - Visualizzazione tabella dati generali con inserimento di elementi per pagina non validi", async ({ page, browserName }) => {
  const reporter = new TestResultReporter();
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.3_TC4", "Visualizzazione tabella dati generali con inserimento di elementi per pagina non validi");

  await accessPlatformAsRegisteredUser(page, reporter);
  await accessAndScrollToGeneralDataTableInvalidElementsPerPage(page, reporter);
  await insertInvalidElementsPerPage(page, reporter);
  await verifySystemBehavior(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});