import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { loginAsRegisteredUser, selectDashboard, scrollToGeneralDataTable, sortGeneralDataTableByColumn, verifySortingByColumn } from './UC2.3_TC2.functions.js';

test("UC2.3_TC2 - Visualizzazione tabella dati generali con ordinamento personalizzato", async ({page, browserName}) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase('UC2.3_TC2', 'Visualizzazione tabella dati generali con ordinamento personalizzato');

    await loginAsRegisteredUser(page, reporter);
    await selectDashboard(page, reporter);
    await scrollToGeneralDataTable(page, reporter);
    await sortGeneralDataTableByColumn(page, reporter);
    await verifySortingByColumn(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});