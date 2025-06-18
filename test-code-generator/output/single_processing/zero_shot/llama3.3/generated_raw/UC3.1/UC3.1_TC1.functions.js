import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenuOption } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenuOption(page, null);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID1', 'Access census sheet section', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const selectColumnForSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniColumn();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID2', 'Select column for sorting', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const scrollHorizontallyToViewAllColumns = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the horizontal scrolling is done using the mouse or touchpad
    await page.evaluate(() => {
        document.querySelector('.table-container').scrollLeft = 1000;
    });
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!(await page.url().includes(process.env.E2E_CTS_URL))) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID3', 'Scroll horizontally to view all columns', true, passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}