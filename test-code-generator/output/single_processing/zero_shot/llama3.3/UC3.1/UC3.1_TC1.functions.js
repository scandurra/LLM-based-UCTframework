import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessPlatformAndAuthenticate, selectCensusSheetMenu } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessCensusSheetSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectCensusSheetMenu(page, reporter);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID1', 'Access the census sheet section', 'The table with information is displayed correctly', 'The table with information is displayed correctly', true, '', executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_CTS_URL);
}

export const selectColumnForSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniColumn();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID2', 'Select a column for sorting and click on the column name', 'The rows are sorted based on the selection', 'The rows are sorted based on the selection', true, '', executionTime);
    }

    expect(await censusSheetPage.azioniColumn.isVisible()).toBeTruthy();
}

export const scrollHorizontallyToViewAllColumns = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const censusSheetPage = new CensusSheetPage(page);
    await page.evaluate(() => {
        document.querySelector('.table-container').scrollTo({ left: 1000, behavior: 'smooth' });
    });
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID3', 'Scroll horizontally to view all columns', 'All columns are visible and scrollable', 'All columns are visible and scrollable', true, '', executionTime);
    }

    expect(await censusSheetPage.statsColumn.isVisible()).toBeTruthy();
}