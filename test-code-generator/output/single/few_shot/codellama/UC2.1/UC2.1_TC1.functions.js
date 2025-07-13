import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

// Step 1
export const clickOnDownloadPDFButton = async function(page, reporter) {
    const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
    
    let startTime = Date.now();
    await dashboardPagePdfDownload.downloadPDF();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Click on download PDF button', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const confirmDownloadRequest = async function(page, reporter) {
    // TODO: Implement this step
    
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Confirm download request', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const verifySuccessMessage = async function(page, reporter) {
    // TODO: Implement this step
    
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Verify success message', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}