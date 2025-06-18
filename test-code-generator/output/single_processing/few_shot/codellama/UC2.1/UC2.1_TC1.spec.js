import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import { loginAsRegisteredUser, selectDashboardMenuItem } from '../UC2/UC2_TC1.functions.js';

test("UC2_TC1 - Download PDF con successo", async ({ page, browserName }) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC2_TC1", "Download PDF con successo");

    // Reuse existing method in the prompt without redefining them
    await loginAsRegisteredUser(page, null);
    await selectDashboardMenuItem(page, null);
    await clickOnDownloadPDFButton(page, reporter);
    await confirmDownloadRequest(page, reporter);
    await verifySuccessMessageIsDisplayed(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});