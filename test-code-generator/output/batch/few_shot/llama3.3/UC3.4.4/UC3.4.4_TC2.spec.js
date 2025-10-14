import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { selectFreezeOperationAndCancel, verifySheetStatusAfterCancel } from './UC3.4.4_TC2.functions.js';

test("UC3.4.4_TC2 - Congelamento scheda censimento con annullamento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC2", "Congelamento scheda censimento con annullamento");

    await accessCensusSheetSection(page, reporter);

    await selectFreezeOperationAndCancel(page, reporter);
    await verifySheetStatusAfterCancel(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });    
});