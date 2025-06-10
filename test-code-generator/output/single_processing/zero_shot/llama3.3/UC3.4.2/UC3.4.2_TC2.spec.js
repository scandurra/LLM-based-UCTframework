import { test, expect } from '@playwright/test';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

import { selectDeleteOperation, cancelDeletion } from './UC3.4.2_TC2.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4.2_TC2 - Annullamento eliminazione scheda censimento", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC2 - Annullamento eliminazione scheda censimento");

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await clickAzioneButton(page, reporter);
    await selectDeleteOperation(page, reporter);
    await cancelDeletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});