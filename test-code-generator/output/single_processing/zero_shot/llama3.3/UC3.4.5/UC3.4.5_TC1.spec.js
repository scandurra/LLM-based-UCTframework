import { test, expect } from '@playwright/test';

import { accessCensusSheetSection, selectDettaglioOperation, verifyGeneralData, navigateHierarchy } from './UC3.4.5_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4.5_TC1 - Visualizzazione dettaglio scheda censimento con dati validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.5_TC1 - Visualizzazione dettaglio scheda censimento con dati validi");

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await selectDettaglioOperation(page, reporter);
    await verifyGeneralData(page, reporter);
    await navigateHierarchy(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});