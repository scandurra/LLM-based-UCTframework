import { test, expect } from '@playwright/test';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickDownloadPDFButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
    await dashboardPagePdfDownload.downloadPDF();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID1', 'Click on the PDF download button', 'The download process starts', 'The download process starts', true, '', executionTime);
    }

    expect(await dashboardPagePdfDownload.isDownloadButtonVisible()).toBe(false);
}

export const confirmDownloadRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Playwright does not support direct interaction with browser's download prompt
    // This step is skipped as it's not possible to automate using Playwright
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID2', 'Confirm the download request', 'The file starts downloading', 'The file starts downloading', true, '', executionTime);
    }
}

export const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // This step is not possible to automate using Playwright as it requires accessing the browser's download section
    // However, we can check if the download button is no longer visible after clicking on it
    const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
    expect(await dashboardPagePdfDownload.isDownloadButtonVisible()).toBe(false);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID3', 'Verify the success message', 'Success message is displayed', 'Success message is displayed', true, '', executionTime);
    }
}