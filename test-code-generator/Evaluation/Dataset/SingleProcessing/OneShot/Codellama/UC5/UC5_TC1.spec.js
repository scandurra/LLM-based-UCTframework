import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPortal, selectItalianLanguage, verifyItalianLanguage } from './UC5_TC1.functions.js';

test("UC5_TC1 - Selezione lingua italiana", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC5_TC1", "Selezione lingua italiana");

    await accessPortal(page, reporter);
    await selectItalianLanguage(page, reporter);
    await verifyItalianLanguage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});