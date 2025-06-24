import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToDashboardSection, clickOnColumnName, verifySorting } from './UC2.3_TC2.functions.js';

test("UC2_TC2 - Visualizzazione tabella dati generali con ordinamento personalizzato", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC2", "Visualizzazione tabella dati generali con ordinamento personalizzato");
    
    // Call step functions in sequence
    await navigateToDashboardSection(page, reporter);
    await clickOnColumnName(page, reporter);
    await verifySorting(page, reporter);
    
    reporter.onTestEnd(test, { status: "passed" });
});