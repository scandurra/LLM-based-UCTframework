import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3.4/UC3.4_TC1.functions.js';

import { tryToFreezeWithoutSelectingASheet, verifySheetStatusAfterFreezeWithoutSelection } from './UC3.4.4_TC4.functions.js';

test("UC3.4.4_TC4 - Congelamento senza selezione di una scheda", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.4_TC4", "Congelamento senza selezione di una scheda");

    await accessCensusSheetSection(page, reporter);

    await tryToFreezeWithoutSelectingASheet(page, reporter);
    await verifySheetStatusAfterFreezeWithoutSelection(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });    
});