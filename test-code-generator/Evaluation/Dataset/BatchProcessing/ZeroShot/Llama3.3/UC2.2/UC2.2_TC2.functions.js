import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

export const leaveComuneEmpty = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageIlluminationSearch(page);
    await expect(dashboardPage.comuniDropdown).not.toBeVisible();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC2_ID1', 'Lascia vuoto il campo del comune', true, await dashboardPage.isComuniDropdownVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isComuniDropdownVisible()).toBeTruthy();
}

export const tryConfirmSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageIlluminationSearch(page);
    await dashboardPage.applySearch();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC2_ID2', 'Tenta di confermare la ricerca', true, !await dashboardPage.isMapVisible(), true, {}, executionTime);
    }

    expect(!await dashboardPage.isMapVisible()).toBeTruthy();
}