import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

export const step1_ClickDownloadPDFButton = async function (page, dashboardPagePdfDownload, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Download PDF button
    await dashboardPagePdfDownload.downloadPDF();
    
    // Verify that the download process starts
    await expect(page).toHaveText('Starting download...');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Click on Download PDF button', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.download-pdf')).toBe('Starting download...');
}

export const step2_ConfirmDownloadRequest = async function (page, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Confirm button in the browser's download dialog
    await page.click('text=Allow');
    
    // Verify that the file starts downloading
    await expect(page).toHaveText('Downloading...');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Confirm download request', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.download-pdf')).toBe('Downloading...');
}

export const step3_VerifySuccessMessage = async function (page, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Wait for the success message to appear
    await page.waitForSelector('text=Download completed!');
    
    // Verify that the success message is displayed
    await expect(page).toHaveText('Download completed!');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Verify success message', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.download-pdf')).toBe('Download completed!');
}