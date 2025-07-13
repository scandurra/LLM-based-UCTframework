import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetSection, verifyElementsPresence } from './UC3_TC4.functions.js';

test("UC3_TC4 - Verifica della presenza di tutti gli elementi nella sezione schede censimento", async ({ page, browserName }) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC3_TC4", "Verifica della presenza di tutti gli elementi nella sezione schede censimento");

    // Call step functions in sequence
    await accessCensusSheetSection(page, reporter);
    await verifyElementsPresence(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});