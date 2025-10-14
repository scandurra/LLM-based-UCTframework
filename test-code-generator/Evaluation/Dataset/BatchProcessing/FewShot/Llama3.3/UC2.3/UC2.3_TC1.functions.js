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
      reporter.addStep('UC2.3_TC1_ID1', 'Accedi alla sezione dashboard tramite il menù apposito', 'La sezione dashboard viene visualizzata correttamente', 'La sezione dashboard è stata visualizzata correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_DASHBOARD_URL);
}

export const scrollUntilTableVisible = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await page.waitForSelector('table');

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC1_ID2', 'Scorri nella pagina fino a visualizzare la sezione tabellare dedicata ai dati generali', 'La tabella dei dati generali è visibile e contiene le informazioni attese', 'La tabella dei dati generali è stata visualizzata correttamente', true, {}, executionTime);
  }

  expect(await page.isVisible('table')).toBeTruthy();
}

export const verifyScrollingAndSelection = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.navigateToNextPage();
  await dashboardPageGeneralDataTable.changeElementsPerPage();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC1_ID3', 'Verifica che sia possibile scorrere tra i comuni disponibili e modificare gli elementi visualizzati per pagina', 'Le funzionalità di scrolling e selezione del numero di elementi per pagina funzionano correttamente', 'Le funzionalità di scrolling e selezione del numero di elementi per pagina sono state verificate correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageGeneralDataTable.isNextButtonVisible()).toBeTruthy();
}