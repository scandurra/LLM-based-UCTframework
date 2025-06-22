import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToGeneralDataTableForQuickSearch = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await selectDashboardMenu(page, null);
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await page.waitForSelector(generalDataTable.generalDataTable);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC5_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', true, await generalDataTable.isTableVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isTableVisible()).toBeTruthy();
}

export const verifyQuickSearchFunctionality = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    await generalDataTable.quickSearch("Roma");

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC5_ID2', 'Inserisci un testo di ricerca nel campo di ricerca rapida', true, await generalDataTable.isSearchResultVisible(), true, {}, executionTime);
    }

    expect(await generalDataTable.isSearchResultVisible()).toBeTruthy();
}

export const verifyQuickSearchResult = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const generalDataTable = new DashboardPageGeneralDataTable(page);
    const searchResult = await generalDataTable.getSearchResult();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.3_TC5_ID3', 'Verifica che il risultato della ricerca sia corretto', true, searchResult.includes("Roma"), true, {}, executionTime);
    }

    expect(searchResult).toContain("Roma");
}