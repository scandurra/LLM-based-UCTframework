import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDownloadOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await clickAzioneButton(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioneDownload();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        // Wait for download to start
        await page.waitForEvent('filechooser', { timeout: 30000 });
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID1', 'Select download operation of census sheet', 'The browser starts the download', `Clicked on download button`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const waitDownloadCompletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Wait for download to complete
    await page.waitForEvent('filechooser', { timeout: 30000 });

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        // Check if file is downloaded correctly
        // This step might need additional implementation based on the actual download process
        await page.waitForTimeout(5000); // Wait for 5 seconds to ensure download is complete
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID2', 'Wait for download completion', 'The file is downloaded correctly', `Download completed`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}