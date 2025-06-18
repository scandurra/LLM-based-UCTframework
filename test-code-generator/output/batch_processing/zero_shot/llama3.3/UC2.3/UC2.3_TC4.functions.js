import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToGeneralDataTableForInvalidPageSize = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectDashboardMenu(page, null);
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await page.waitForSelector(generalDataTable.generalDataTable);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC4_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', true, await generalDataTable.isTableVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isTableVisible()).toBeTruthy();
}

export const verifyErrorMessageForInvalidPageSize = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await generalDataTable.setInvalidPageSize();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC4_ID2', 'Inserisci un numero di elementi per pagina non valido', true, await generalDataTable.isErrorMessageVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isErrorMessageVisible()).toBeTruthy();
}

export const verifyDefaultPageSize = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    const pageSize = await generalDataTable.getPageSize();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC4_ID3', 'Verifica che il sistema gestisca correttamente l\'input non valido', true, pageSize === 10, true, {}, executionTime);
    }

    expect(pageSize).toBe(10);
}