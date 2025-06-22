import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

// Step 1
export const navigateToDashboardAndScrollDown = async function(page, reporter) {
    // Reuse existing method in the prompt without redefining them
    await loginAsRegisteredUser(page, null);
    await selectDashboardMenuItem(page, null);
    
    let startTime = Date.now();
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await dashboardPageGeneralDataTable.isTableVisible();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const sortTableByColumn = async function (page, reporter) {
    let startTime = Date.now();
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await dashboardPageGeneralDataTable.sortByRegion();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Clicca sul nome di una colonna per ordinare i dati', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const verifySorting = async function (page, reporter) {
    let startTime = Date.now();
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await dashboardPageGeneralDataTable.sortByPointsOfLight();
    let endTime = Date.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Verifica che l’ordinamento funzioni anche con più clic (ascendente e discendente)', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}