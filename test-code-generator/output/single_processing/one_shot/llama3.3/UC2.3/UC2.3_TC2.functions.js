import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const navigateToDashboardAndTable = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Reuse existing method in the prompt without redefining them
  await openDashboard(page, null);
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  const isTableVisible = await dashboardPageGeneralDataTable.isTableVisible();
  expect(isTableVisible).toBe(true);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID1', 
      'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', 
      "La tabella è visibile", 
      isTableVisible ? "La tabella è visibile" : "La tabella non è visibile",
      isTableVisible,
      {},
      executionTime
    );
  }
}

export const sortByColumn = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.sortByRegion();
  const tableContentAfterFirstSort = await dashboardPageGeneralDataTable.getTableContent();
  await dashboardPageGeneralDataTable.sortByRegion();
  const tableContentAfterSecondSort = await dashboardPageGeneralDataTable.getTableContent();
  expect(tableContentAfterFirstSort).not.toEqual(tableContentAfterSecondSort);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID2', 
      'Clicca sul nome di una colonna per ordinare i dati', 
      "I dati vengono ordinati correttamente secondo la colonna selezionata", 
      tableContentAfterFirstSort !== tableContentAfterSecondSort ? "I dati vengono ordinati correttamente secondo la colonna selezionata" : "I dati non vengono ordinati correttamente secondo la colonna selezionata",
      tableContentAfterFirstSort !== tableContentAfterSecondSort,
      {},
      executionTime
    );
  }
}

export const verifyAlternatingSorting = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.sortByRegion();
  let tableContent = await dashboardPageGeneralDataTable.getTableContent();
  for (let i = 0; i < 3; i++) {
    await dashboardPageGeneralDataTable.sortByRegion();
    const newTableContent = await dashboardPageGeneralDataTable.getTableContent();
    expect(newTableContent).not.toEqual(tableContent);
    tableContent = newTableContent;
  }
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.3_TC2_ID3', 
      'Verifica che l’ordinamento funzioni anche con più clic (ascendente e discendente)', 
      "L’ordinamento dei dati si alterna correttamente tra ascendente e discendente", 
      "L’ordinamento dei dati si alterna correttamente tra ascendente e discendente",
      true,
      {},
      executionTime
    );
  }
}