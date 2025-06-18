import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

// Step 1
export const clickOnDownloadPDFButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
    await dashboardPagePdfDownload.downloadPDF();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Clicca sul tasto di download del PDF', 'Il processo di download inizia', 'Il processo di download inizia', true, {}, executionTime);
    }
}

// Step 2
export const confirmDownloadRequest = async function(page, reporter) {
    // TODO: Implement this step
}

// Step 3
export const verifySuccessMessageIsDisplayed = async function(page, reporter) {
    // TODO: Implement this step
}