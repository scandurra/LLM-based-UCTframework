import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageIlluminationSearch } from '../../models/page_object_models/dashboard_page_illumination_search.js';

export const selectMultipleComuni = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageIlluminationSearch(page);
    await dashboardPage.selectComune(0);
    await dashboardPage.selectComune(1);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC4_ID1', 'Seleziona più comuni', true, await dashboardPage.isComuniDropdownVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isComuniDropdownVisible()).toBeTruthy();
}

export const confirmSearchWithMultipleComuni = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPage = new DashboardPageIlluminationSearch(page);
    await dashboardPage.applySearch();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.2_TC4_ID2', 'Conferma la ricerca con più comuni', true, await dashboardPage.isMapVisible(), true, {}, executionTime);
    }

    expect(await dashboardPage.isMapVisible()).toBeTruthy();
}