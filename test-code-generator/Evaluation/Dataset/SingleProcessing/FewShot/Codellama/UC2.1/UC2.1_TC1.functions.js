import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

// Step 1
export const clickOnDownloadPDFButton = async function(page, reporter) {
    const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);

    let startTime = Date.now();
    await dashboardPagePdfDownload.downloadPDF();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Clicca sul tasto di download del PDF', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const confirmDownloadRequest = async function (page, reporter) {
    // TODO: Implement this step
}

// Step 3
export const verifySuccessMessageIsDisplayed = async function (page, reporter) {
    // TODO: Implement this step
}