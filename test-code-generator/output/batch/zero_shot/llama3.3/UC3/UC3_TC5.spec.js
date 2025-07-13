import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSectionForUsability, performUsabilityActions } from './UC3_TC5.functions.js';

test("UC3_TC5 - Test di usabilità della sezione schede censimento", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC5", "Test di usabilità della sezione schede censimento");

    // Call step functions in sequence
    await accessCensusSheetSectionForUsability(page, reporter);
    await performUsabilityActions(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});