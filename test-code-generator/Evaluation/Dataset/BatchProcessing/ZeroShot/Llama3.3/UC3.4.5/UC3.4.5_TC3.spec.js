import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAndAuthenticate } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection } from './UC3.4_TC1.functions.js';

import { selectDettaglioOperationWithMissingData, verifyMessage, verifyAddDataOptions } from './UC3.4.5_TC3.functions.js';

test("UC3.4.5_TC3 - Visualizzazione dettaglio scheda censimento con dati mancanti", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC3", "Visualizzazione dettaglio scheda censimento con dati mancanti");

    await accessPlatformAndAuthenticate(page, reporter);
    await accessCensusSheetSection(page, reporter);
    await selectDettaglioOperationWithMissingData(page, reporter);
    await verifyMessage(page, reporter);
    await verifyAddDataOptions(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});