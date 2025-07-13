import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const navigateToGeneralDataTable = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await accessPlatformAsRegisteredUser(page, null);
    await selectDashboardMenu(page, null);
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    const isTableVisible = await dashboardPageGeneralDataTable.isTableVisible();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    if (!isTableVisible) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID1', 'Navigate to general data table', true, isTableVisible, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const sortByColumn = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await dashboardPageGeneralDataTable.sortByRegion();
    const tableContentAfterSort = await dashboardPageGeneralDataTable.getTableContent();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    // Add logic to verify the sorting
    if (tableContentAfterSort === null || tableContentAfterSort === undefined) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID2', 'Sort by column', true, !passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}

export const verifyAlternatingSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await dashboardPageGeneralDataTable.sortByRegion();
    let tableContentAfterFirstSort = await dashboardPageGeneralDataTable.getTableContent();
    await dashboardPageGeneralDataTable.sortByRegion();
    let tableContentAfterSecondSort = await dashboardPageGeneralDataTable.getTableContent();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    let passFail = true;
    // Add logic to verify the alternating sorting
    if (tableContentAfterFirstSort === tableContentAfterSecondSort) {
        passFail = false;
    }
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID3', 'Verify alternating sorting', true, !passFail, passFail, '', executionTime);
    }

    expect(passFail).toBeTruthy();
}