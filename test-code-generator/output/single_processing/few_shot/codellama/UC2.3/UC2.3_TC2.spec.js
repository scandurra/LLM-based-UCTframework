import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { navigateToDashboardAndScrollDown, sortTableByColumn, verifySorting } from './UC2.3_TC2.functions.js';

test("UC2_TC1 - Visualizzazione tabella dati generali con ordinamento personalizzato", async ({page, browserName}) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Visualizzazione tabella dati generali con ordinamento personalizzato");
    
    // Call step functions in sequence
    await navigateToDashboardAndScrollDown(page, reporter);
    await sortTableByColumn(page, reporter);
    await verifySorting(page, reporter);
    
    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});