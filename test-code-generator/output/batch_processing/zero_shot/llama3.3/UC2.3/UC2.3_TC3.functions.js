import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToGeneralDataTableForNonExistingCity = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectDashboardMenu(page, null);
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await page.waitForSelector(generalDataTable.generalDataTable);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC3_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', true, await generalDataTable.isTableVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isTableVisible()).toBeTruthy();
}

export const verifyErrorMessageForNonExistingCity = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await generalDataTable.selectNonExistingCity();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC3_ID2', 'Seleziona un comune che non esiste o non è disponibile', true, await generalDataTable.isErrorMessageVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isErrorMessageVisible()).toBeTruthy();
}

export const verifyErrorMessageUsefulness = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    const errorMessage = await generalDataTable.getErrorMessage();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC3_ID3', 'Verifica che il messaggio di errore sia chiaro e utile per l\'utente', true, errorMessage.includes("Comune non trovato"), true, {}, executionTime);
    }

    expect(errorMessage).toContain("Comune non trovato");
}