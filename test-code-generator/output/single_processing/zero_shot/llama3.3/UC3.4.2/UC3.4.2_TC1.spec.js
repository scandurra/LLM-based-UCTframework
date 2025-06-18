import { test, expect } from '@playwright/test';

import { accessCensusSheetSection } from '../UC3/UC3_TC1.functions.js';

import { selectDeleteOperation, confirmDeleteOperation } from './UC3.4.2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4.2_TC1 - Delete census sheet with confirmation", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.2_TC1", "Delete census sheet with confirmation");

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await selectDeleteOperation(page, reporter);
    await confirmDeleteOperation(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});