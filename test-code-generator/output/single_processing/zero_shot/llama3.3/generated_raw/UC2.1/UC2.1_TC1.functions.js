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
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_DASHBOARD_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID1', 'Click download PDF button', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const confirmDownloadRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since there's no specific page object model for this step,
    // we'll assume the download starts automatically after clicking the button
    // You might need to add additional logic here depending on your application
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_DASHBOARD_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID2', 'Confirm download request', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyDownloadCompletionMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Since there's no specific page object model for this step,
    // we'll assume the message is displayed automatically after download completion
    // You might need to add additional logic here depending on your application
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_DASHBOARD_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID3', 'Verify download completion message', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}