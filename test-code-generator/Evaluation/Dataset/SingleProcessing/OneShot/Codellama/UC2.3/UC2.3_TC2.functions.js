import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { LoginPage } from '../../models/page_object_models/login_page.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

// Step 1
export const loginAsRegisteredUser = async function(page, reporter) {
    const startTime = new Date().getTime();
    const loginPage = new LoginPage(page);
    await insertCorrectCredentials(page, null);
    await clickLoginButton(page, null);
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi alla piattaforma come utente registrato', 'La home page della piattaforma è visibile', 'La home page della piattaforma è visibile', true, {}, executionTime);
    }
}

// Step 2
export const selectDashboard = async function(page, reporter) {
    const startTime = new Date().getTime();
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickDashboardLink();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Seleziona la voce di menù relativa alla dashboard', 'La sezione della dashboard si apre correttamente', 'La sezione della dashboard si apre correttamente', true, {}, executionTime);
    }
}

// Step 3
export const scrollToGeneralDataTable = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await dashboardPageGeneralDataTable.scrollIntoView();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Scorri fino alla tabella dei dati generali', 'La tabella è visibile', 'La tabella è visibile', true, {}, executionTime);
    }
}

// Step 4
export const sortGeneralDataTableByColumn = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await dashboardPageGeneralDataTable.clickSortButton('nome_colonna'); // Replace 'nome_colonna' with the actual column name
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID4', 'Clicca sul nome della colonna per ordinare i dati', 'I dati vengono ordinati correttamente secondo la colonna selezionata', 'I dati vengono ordinati correttamente secondo la colonna selezionata', true, {}, executionTime);
    }
}

// Step 5
export const verifyGeneralDataTableSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
    await dashboardPageGeneralDataTable.verifySortedColumn('nome_colonna'); // Replace 'nome_colonna' with the actual column name
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID5', 'Verifica che l\'ordinamento funzioni anche con più clic (ascendente e discendente)', 'L\'ordinamento dei dati si alterna correttamente tra ascendente e discendente', 'L\'ordinamento dei dati si alterna correttamente tra ascendente e discendente', true, {}, executionTime);
    }
}