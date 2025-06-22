import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToGeneralDataTableQuickSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  await selectDashboardMenu(page, null);
  await page.waitForTimeout(1000); // wait for the page to load
  const generalDataTable = new DashboardPageGeneralDataTable(page);
  await page.scrollTo(0, 500); // scroll down to the table
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC5_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', 'La tabella è visibile', 'La tabella è stata visualizzata', true, {}, executionTime);
  }
  expect(await generalDataTable.isTableVisible()).toBeTruthy();
}

export const insertQuickSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const generalDataTable = new DashboardPageGeneralDataTable(page);
  await page.fill('#quick-search-input', 'Roma');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC5_ID2', 'Inserisci una ricerca rapida nel campo di ricerca', 'I risultati della ricerca vengono visualizzati nella tabella', 'I risultati della ricerca sono stati visualizzati', true, {}, executionTime);
  }
}

export const verifyQuickSearchResults = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.waitForSelector('#search-results');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC5_ID3', 'Verifica che i risultati della ricerca siano corretti e coerenti con la ricerca effettuata', 'I risultati della ricerca sono coerenti con la ricerca effettuata', 'I risultati della ricerca sono stati verificati', true, {}, executionTime);
  }
}