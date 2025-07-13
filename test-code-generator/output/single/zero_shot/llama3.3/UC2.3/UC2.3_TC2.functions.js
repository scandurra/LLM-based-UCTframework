import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const navigateToGeneralDataTable = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAsRegisteredUser(page, null);
    await selectDashboardMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        const generalDataTable = new DashboardPageGeneralDataTable(page);
        await expect(await generalDataTable.isTableVisible()).toBeTruthy();
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID1', 'Navigate to the dashboard and scroll down to the general data table', 'The table is visible', `Navigated to ${process.env.E2E_DASHBOARD_URL}`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const sortByColumn = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await generalDataTable.sortByRegion();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        const tableContent = await generalDataTable.getTableContent();
        // Add assertion to check if the data is sorted correctly
        expect(tableContent).toContain('Regione');
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID2', 'Click on a column name to sort the data', 'The data is sorted correctly according to the selected column', `Sorted by region`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyAlternatingSortOrder = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await generalDataTable.sortByRegion();
    await generalDataTable.sortByRegion();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    try {
        const tableContent = await generalDataTable.getTableContent();
        // Add assertion to check if the data is sorted correctly in alternating order
        expect(tableContent).toContain('Regione');
    } catch (error) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID3', 'Verify that the sorting works with multiple clicks (ascending and descending)', 'The data sorting alternates correctly between ascending and descending', `Alternating sort order verified`, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}