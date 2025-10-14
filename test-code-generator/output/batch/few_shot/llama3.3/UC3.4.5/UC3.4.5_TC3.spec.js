import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { selectDettaglioOperationWithMissingData, verifyMessageForMissingData, verifyOptionsToAddMissingData } from './UC3.4.5_TC3.functions.js';

test("UC3.4.5_TC3 - Visualizzazione dettaglio scheda censimento con dati mancanti", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC3", "Visualizzazione dettaglio scheda censimento con dati mancanti");

    await selectDettaglioOperationWithMissingData(page, reporter);

    await verifyMessageForMissingData(page, reporter);
    await verifyOptionsToAddMissingData(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});