import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToGeneralDataTable = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectDashboardMenu(page, null);
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await page.waitForSelector(generalDataTable.generalDataTable);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', true, await generalDataTable.isTableVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isTableVisible()).toBeTruthy();
}

export const verifySortingFunctionality = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await generalDataTable.sortByRegion();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID2', 'Clicca su più colonne per ordinare i dati in base a più criteri', true, await generalDataTable.isSortedByRegion(), true, {}, executionTime);
    }

    expect(await generalDataTable.isSortedByRegion()).toBeTruthy();
}

export const verifyMultipleSorting = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await generalDataTable.sortByRegion();
    await generalDataTable.sortByPopulation();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC2_ID3', 'Verifica che l\'ordinamento funzioni come atteso anche con più clic', true, await generalDataTable.isSortedByRegion() && await generalDataTable.isSortedByPopulation(), true, {}, executionTime);
    }

    expect(await generalDataTable.isSortedByRegion()).toBeTruthy();
    expect(await generalDataTable.isSortedByPopulation()).toBeTruthy();
}