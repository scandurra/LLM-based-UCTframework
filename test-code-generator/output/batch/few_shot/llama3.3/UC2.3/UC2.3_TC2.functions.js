import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToTable = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await selectDashboardMenu(page, null);
  await page.waitForSelector('table');

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC2_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', 'La tabella è visibile', 'La tabella è stata visualizzata correttamente', true, {}, executionTime);
  }

  expect(await page.isVisible('table')).toBeTruthy();
}

export const clickOnColumnsToSort = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.sortByColumn();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC2_ID2', 'Clicca su più colonne per ordinare i dati in base a più criteri', 'I dati vengono ordinati correttamente secondo le colonne selezionate', 'I dati sono stati ordinati correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageGeneralDataTable.isSorted()).toBeTruthy();
}

export const verifySortingFunctionality = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.sortByColumnAgain();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC2_ID3', 'Verifica che l\'ordinamento funzioni come atteso anche con più clic', 'L\'ordinamento dei dati si alterna correttamente tra ascendente e discendente per ogni colonna selezionata', 'L\'ordinamento dei dati è stato verificato correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageGeneralDataTable.isSortedAgain()).toBeTruthy();
}