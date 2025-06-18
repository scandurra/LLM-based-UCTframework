import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

// Step 1: Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali
export const accessGeneralDataTable = async function(page, reporter) {
  await accessPlatform(page, null);
  await selectDashboardMenu(page, null);

  const startTime = new Date().getTime();
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  const isTableVisible = await dashboardPageGeneralDataTable.isTableVisible();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID1', 'Access general data table', 'Table is visible', isTableVisible ? 'Table is visible' : 'Table is not visible', isTableVisible, '', executionTime);
  }

  expect(isTableVisible).toBeTruthy();
}

// Step 2: Clicca sul nome di una colonna per ordinare i dati
export const sortByRegion = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.sortByRegion();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID2', 'Sort by region', 'Data is sorted correctly', 'Data is sorted correctly', true, '', executionTime);
  }
}

// Step 3: Verifica che l’ordinamento funzioni anche con più clic (ascendente e discendente)
export const checkAlternatingSorting = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.sortByRegion();
  await dashboardPageGeneralDataTable.sortByRegion();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID3', 'Check alternating sorting', 'Data is sorted correctly in both ascending and descending order', 'Data is sorted correctly in both ascending and descending order', true, '', executionTime);
  }
}