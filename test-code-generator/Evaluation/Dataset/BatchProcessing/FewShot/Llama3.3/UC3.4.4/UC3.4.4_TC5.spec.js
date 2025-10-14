import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { tryToFreezeWithInvalidData, verifySheetStatusAfterFreezeWithInvalidData } from './UC3.4.4_TC5.functions.js';

test("UC3.4.4_TC5 - Congelamento con dati non validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC5", "Congelamento con dati non validi");

    await accessCensusSheetSection(page, reporter);

    await tryToFreezeWithInvalidData(page, reporter);
    await verifySheetStatusAfterFreezeWithInvalidData(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });    
});