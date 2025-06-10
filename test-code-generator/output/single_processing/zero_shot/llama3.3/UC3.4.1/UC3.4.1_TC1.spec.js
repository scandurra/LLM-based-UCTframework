import { test, expect } from '@playwright/test';

import { accessCensusSheetSection } from '../UC3.4_TC1.functions.js';

import { selectDownloadOperation, waitDownloadCompletion } from './UC3.4.1_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC3.4.1_TC1 - Download census sheet with success", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3.4.1_TC1 - Download census sheet with success");

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await selectDownloadOperation(page, reporter);
    await waitDownloadCompletion(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});