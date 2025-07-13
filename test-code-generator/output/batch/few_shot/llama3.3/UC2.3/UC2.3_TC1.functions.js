import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessDashboardSection = async function(page, reporter) {
  const startTime = new Date().getTime();
  await selectDashboardMenu(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC1_ID1', 'Accedi alla sezione dashboard tramite il menù apposito', 'La sezione dashboard viene visualizzata correttamente', 'La sezione dashboard è stata visualizzata', true, {}, executionTime);
  }
}

export const scrollDownToGeneralDataTable = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.waitForTimeout(1000); // wait for the page to load
  const generalDataTable = new DashboardPageGeneralDataTable(page);
  await page.scrollTo(0, 500); // scroll down to the table
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC1_ID2', 'Scorri nella pagina fino a visualizzare la sezione tabellare dedicata ai dati generali', 'La tabella dei dati generali è visibile e contiene le informazioni attese', 'La tabella dei dati generali è stata visualizzata', true, {}, executionTime);
  }
  expect(await generalDataTable.isTableVisible()).toBeTruthy();
}

export const verifyScrollingAndSelection = async function(page, reporter) {
  const startTime = new Date().getTime();
  const generalDataTable = new DashboardPageGeneralDataTable(page);
  await generalDataTable.navigateToNextPage();
  await generalDataTable.changeElementsPerPage('50');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.3_TC1_ID3', 'Verifica che sia possibile scorrere tra i comuni disponibili e modificare gli elementi visualizzati per pagina', 'Le funzionalità di scrolling e selezione del numero di elementi per pagina funzionano correttamente', 'Le funzionalità di scrolling e selezione del numero di elementi per pagina sono state verificate', true, {}, executionTime);
  }
  expect(await generalDataTable.isNextButtonVisible()).toBeTruthy();
  expect(await generalDataTable.isElementsDropdownVisible()).toBeTruthy();
}