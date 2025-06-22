import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessDashboardSection = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectDashboardMenu(page, null);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID1', 'Accedi alla sezione dashboard tramite il menù apposito', true, await page.url() === process.env.E2E_DASHBOARD_URL, true, {}, executionTime);
    }

    expect(await page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

export const scrollUntilGeneralDataTableIsVisible = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await page.waitForSelector(generalDataTable.generalDataTable);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID2', 'Scorri nella pagina fino a visualizzare la sezione tabellare dedicata ai dati generali', true, await generalDataTable.isTableVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isTableVisible()).toBeTruthy();
}

export const verifyScrollingAndSelectionFunctionality = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await generalDataTable.navigateToNextPage();
    await generalDataTable.changeElementsPerPage('50');

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC1_ID3', 'Verifica che sia possibile scorrere tra i comuni disponibili e modificare gli elementi visualizzati per pagina', true, await generalDataTable.isNextButtonVisible() && await generalDataTable.isElementsDropdownVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isNextButtonVisible()).toBeTruthy();
    expect(await generalDataTable.isElementsDropdownVisible()).toBeTruthy();
}