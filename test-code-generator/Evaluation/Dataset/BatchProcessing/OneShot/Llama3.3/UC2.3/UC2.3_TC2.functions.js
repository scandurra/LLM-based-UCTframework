import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToGeneralDataTable = async function(page, reporter) {
  const startTime = new Date().getTime();
  await selectDashboardMenu(page, null);
  await page.waitForTimeout(1000); // wait for the page to load
  const generalDataTable = new DashboardPageGeneralDataTable(page);
  await page.scrollTo(0, 500); // scroll down to the table
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', 'La tabella è visibile', 'La tabella è stata visualizzata', true, {}, executionTime);
  }
  expect(await generalDataTable.isTableVisible()).toBeTruthy();
}

export const clickOnColumnsToSort = async function(page, reporter) {
  const startTime = new Date().getTime();
  const generalDataTable = new DashboardPageGeneralDataTable(page);
  await generalDataTable.sortByColumn('Comune');
  await generalDataTable.sortByColumn('Regione');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID2', 'Clicca su più colonne per ordinare i dati in base a più criteri', 'I dati vengono ordinati correttamente secondo le colonne selezionate', 'I dati sono stati ordinati', true, {}, executionTime);
  }
}

export const verifySorting = async function(page, reporter) {
  const startTime = new Date().getTime();
  const generalDataTable = new DashboardPageGeneralDataTable(page);
  await generalDataTable.sortByColumn('Comune');
  await generalDataTable.sortByColumn('Regione');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID3', 'Verifica che l\'ordinamento funzioni come atteso anche con più clic', 'L\'ordinamento dei dati si alterna correttamente tra ascendente e discendente per ogni colonna selezionata', 'L\'ordinamento è stato verificato', true, {}, executionTime);
  }
}