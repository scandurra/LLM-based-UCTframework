import { test, expect } from '@playwright/test';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import { scrollDownToGeneralDataSection, verifyGeneralDataContent, verifyPaginationAndElementsPerPage } from './UC2.3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

test("UC2.3_TC1 - Visualizzazione tabella dati generali con impostazioni predefinite", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.3_TC1 - Visualizzazione tabella dati generali con impostazioni predefinite");

    // Navigate to login page
    await page.goto(process.env.E2E_LOGIN_URL);

    // Call step functions in sequence
    await accessPlatformAsRegisteredUser(page, reporter);
    await selectDashboardMenu(page, reporter);
    await scrollDownToGeneralDataSection(page, reporter);
    await verifyGeneralDataContent(page, reporter);
    await verifyPaginationAndElementsPerPage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});