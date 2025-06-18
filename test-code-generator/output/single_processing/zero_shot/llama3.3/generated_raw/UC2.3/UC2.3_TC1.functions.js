import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const scrollDownToGeneralDataSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID1', 'Scroll down to general data section', 'The general data table is visible', 'The general data table is visible', true, '', executionTime);
    }

    expect(await new DashboardPageGeneralDataTable(page).isTableVisible()).toBe(true);
}

export const verifyGeneralDataContent = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await expect(await dashboardPageGeneralDataTable.getTableContent()).toContain('Comune');
    await expect(await dashboardPageGeneralDataTable.getTableContent()).toContain('Regione');
    await expect(await dashboardPageGeneralDataTable.getTableContent()).toContain('N° di Punti Luce');
    await expect(await dashboardPageGeneralDataTable.getTableContent()).toContain('Consumo');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID2', 'Verify general data content', 'The general data table contains the expected information', 'The general data table contains the expected information', true, '', executionTime);
    }
}

export const verifyPaginationAndElementsPerPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await expect(await dashboardPageGeneralDataTable.isNextButtonVisible()).toBe(true);
    await expect(await dashboardPageGeneralDataTable.isElementsDropdownVisible()).toBe(true);
    await dashboardPageGeneralDataTable.changeElementsPerPage('50');
    await expect(await dashboardPageGeneralDataTable.getTableContent()).toContain('Comune');
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID3', 'Verify pagination and elements per page', 'The pagination and elements per page functionality works correctly', 'The pagination and elements per page functionality works correctly', true, '', executionTime);
    }
}