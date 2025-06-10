import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioneButton } from '../UC3.4_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDownloadOperation = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneDownload();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID1', 'Select download operation of the census sheet', 'The browser starts the download', 'The browser starts the download', true, '', executionTime);
    }

    expect(await page.waitForDownload()).not.toBeNull();
}

export const waitDownloadCompletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const download = await page.waitForDownload();
    await download.saveAs('census_sheet.pdf');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID2', 'Wait for the download to complete', 'The file is downloaded correctly', 'The file is downloaded correctly', true, '', executionTime);
    }

    expect(await download.suggestedFilename()).toBe('census_sheet.pdf');
}