import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenuOption } from '../UC3/UC3_TC1.functions.js';

import { accessCensusSheetSection, clickAzioneButton } from './UC3.4_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const downloadCensusSheet = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await clickAzioneButton(page, null);
    await censusSheetPage.clickAzioneDownload();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    // Add assertion to check if download has started
    if (!(await page.waitForDownload())) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID1', 'Seleziona l’operazione di download della scheda censimento', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const waitDownloadCompletion = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Wait for download to complete
    await page.waitForTimeout(5000); // Adjust timeout as needed
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    // Add assertion to check if file has been downloaded correctly
    if (!(await page.context().waitForEvent('download'))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.4.1_TC1_ID2', 'Attenzione la fine del download', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}