import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

// Step 1
export const navigateToDashboardSection = async function(page, reporter) {
    let startTime = DateTime.now();
    
    // Go to login page and insert credentials
    await navigateToLoginPage(page, null);
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    
    // Navigate to dashboard section
    await navigateToDashboard(page, null);
    await selectDashboardLink(page, null);
    
    let endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC2_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 2
export const clickOnColumnName = async function(page, reporter) {
    let startTime = DateTime.now();
    
    // Get dashboard page general data table object
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    
    // Click on column name to sort data
    await dashboardPageGeneralDataTable.clickColumnName("Nome");
    
    let endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC2_ID2', 'Clicca sul nome di una colonna per ordinare i dati', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}

// Step 3
export const verifySorting = async function(page, reporter) {
    let startTime = DateTime.now();
    
    // Get dashboard page general data table object
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    
    // Verify sorting is correct
    await dashboardPageGeneralDataTable.verifySorting("Nome");
    
    let endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    if (reporter) {
        reporter.addStep('UC2_TC2_ID3', 'Verifica che l’ordinamento funzioni correttamente tra ascendente e discendente', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
}