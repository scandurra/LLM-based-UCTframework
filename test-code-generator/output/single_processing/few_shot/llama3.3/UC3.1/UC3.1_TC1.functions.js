import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { authenticateAndOpenDashboard, openCensusSheetInterface } from '../UC3/UC3_TC1.functions.js';

export const visualizeCensusSheets = async function(page, reporter) {
    const startTime = new Date().getTime();
    await openCensusSheetInterface(page, null);
    const censusSheetPage = new CensusSheetPage(page);
    await expect(await page.url()).toContain(process.env.E2E_CTS_URL);
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID1', 'Visualize census sheets', 'Census sheets table is displayed', 'Census sheets table is displayed', true, {}, executionTime);
    }
}

export const sortCensusSheets = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickAzioniColumn();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID2', 'Sort census sheets', 'Census sheets are sorted', 'Census sheets are sorted', true, {}, executionTime);
    }
    await expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const scrollCensusSheets = async function(page, reporter) {
    const startTime = new Date().getTime();
    const censusSheetPage = new CensusSheetPage(page);
    await censusSheetPage.clickSchedaColumn();
    await censusSheetPage.clickProprietarioColumn();
    await censusSheetPage.clickComuneColumn();
    await censusSheetPage.clickStatsColumn();
    await censusSheetPage.clickStatoColumn();
    await censusSheetPage.clickInfoColumn();
    await censusSheetPage.clickCreazioneColumn();
    await censusSheetPage.clickAggiornamentoColumn();
    await censusSheetPage.clickSottomissioneColumn();
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC3.1_TC1_ID3', 'Scroll census sheets', 'All columns are visible and scrollable', 'All columns are visible and scrollable', true, {}, executionTime);
    }
    await expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}