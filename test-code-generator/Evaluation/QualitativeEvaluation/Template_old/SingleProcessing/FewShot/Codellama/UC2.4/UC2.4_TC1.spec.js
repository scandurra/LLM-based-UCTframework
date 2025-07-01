import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { DashboardPageBenchmarkingKpi } from '../../models/page_object_models/dashboard_page_benchmarking_kpi.js';

import { selectTwoOrMoreCommunes, chooseValidKPIForComparison, confirmRequest } from './UC2.4_TC1.functions.js';

test("UC2.4_TC1 - Selezione di comuni e KPI validi per benchmarking", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2.4_TC1", "Selezione di comuni e KPI validi per benchmarking");

    // Reuse existing method in the prompt without redefining them
    await selectTwoOrMoreCommunes(page, null);
    await chooseValidKPIForComparison(page, null);
    await confirmRequest(page, null);

    reporter.onTestEnd(test, { status: "passed" });
});