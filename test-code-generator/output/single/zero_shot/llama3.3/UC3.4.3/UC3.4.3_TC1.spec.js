import { test, expect } from '@playwright/test';

import { accessCensusSheetSection } from '../UC3/UC3.4_TC1.functions.js';

import { selectEditOperation, modifyFieldsWithValidData, confirmChanges } from './UC3.4.3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4.3_TC1 - Modifica scheda censimento con dati validi", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.3_TC1", "Modifica scheda censimento con dati validi");

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await selectEditOperation(page, reporter);
    await modifyFieldsWithValidData(page, reporter);
    await confirmChanges(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});